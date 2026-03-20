import { pharmacieRepository } from './pharmacie.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import { CreerPharmacieDto, ModifierPharmacieDto } from './pharmacie.schema';
import { notifierAdmin, notifierPharmacien } from '../../services/socket.service';
import prisma from '../../config/prisma';

/**
 * Service des pharmacies.
 * Contient toute la logique métier.
 */
export const pharmacieService = {

  /**
   * Récupère toutes les pharmacies validées et ouvertes.
   */
  obtenirToutes: () => {
    return pharmacieRepository.trouverToutes();
  },

  /**
   * Récupère une pharmacie par son id ou lance une erreur 404.
   * @param id - Identifiant de la pharmacie
   */
  obtenirParId: async (id: string) => {
    const pharmacie = await pharmacieRepository.trouverParId(id);
    if (!pharmacie) {
      throw new ErreurApplication(
        MESSAGES.PHARMACIE.INTROUVABLE,
        CODES_HTTP.INTROUVABLE
      );
    }
    return pharmacie;
  },

  /**
   * Recherche les pharmacies ouvertes ayant un médicament disponible
   * et calcule la distance depuis la position de l'utilisateur.
   * @param nomMedicament - Nom du médicament recherché
   * @param latitude - Latitude de l'utilisateur
   * @param longitude - Longitude de l'utilisateur
   */
  rechercherParMedicament: async (
    nomMedicament: string,
    latitude?: number,
    longitude?: number
  ) => {
    if (!nomMedicament || !nomMedicament.trim()) {
      throw new ErreurApplication(
        MESSAGES.GENERAL.TERME_RECHERCHE_VIDE,
        CODES_HTTP.REQUETE_INVALIDE
      );
    }

    const pharmacies = await pharmacieRepository.rechercherParMedicament(nomMedicament);

    if (latitude && longitude) {
      type PharmacieAvecDistance = (typeof pharmacies)[0] & { distance: number };

      const pharmaciesAvecDistance: PharmacieAvecDistance[] = pharmacies.map(
        (pharmacie: (typeof pharmacies)[0]): PharmacieAvecDistance => ({
          ...pharmacie,
          distance: calculerDistanceKm(
            latitude,
            longitude,
            pharmacie.latitude,
            pharmacie.longitude
          ),
        })
      );

      return pharmaciesAvecDistance.sort(
        (a: PharmacieAvecDistance, b: PharmacieAvecDistance) =>
          a.distance - b.distance
      );
    }

    return pharmacies;
  },

  /**
   * Retourne les pharmacies de garde en ce moment.
   */
  obtenirDeGarde: () => {
    return pharmacieRepository.trouverDeGarde();
  },

  /**
   * Retourne la pharmacie du pharmacien connecté.
   * @param proprietaireId - Id du pharmacien connecté
   */
  obtenirMaPharmacie: async (proprietaireId: string) => {
    const pharmacie = await pharmacieRepository.trouverParProprietaire(proprietaireId);
    return pharmacie;
  },

  /**
   * Retourne toutes les pharmacies en attente de validation (admin).
   */
  obtenirEnAttente: () => {
    return pharmacieRepository.trouverEnAttente();
  },

  /**
   * Retourne toutes les pharmacies pour l'admin (incluant non validées).
   */
  obtenirToutesAdmin: () => {
    return pharmacieRepository.trouverToutesAdmin();
  },

  /**
   * Crée une nouvelle pharmacie pour un pharmacien.
   * Notifie l'admin par Socket.io.
   * @param donnees - Données de la pharmacie
   * @param proprietaireId - Id du pharmacien connecté
   */
  creer: async (donnees: CreerPharmacieDto, proprietaireId: string) => {
    // Créer la pharmacie
    const pharmacie = await pharmacieRepository.creer(donnees, proprietaireId);
    
    // Récupérer les infos du pharmacien pour la notification
    const proprietaire = await prisma.utilisateur.findUnique({
      where: { id: proprietaireId },
      select: { nom: true }
    });
    
    // Notifier l'admin via Socket.io
    notifierAdmin(
      'NOUVELLE_PHARMACIE',
      `Nouvelle demande de pharmacie: ${donnees.nom}`,
      {
        pharmacieId: pharmacie.id,
        nomPharmacie: donnees.nom,
        proprietaire: proprietaire?.nom
      }
    );
    
    return pharmacie;
  },

  /**
   * Modifie une pharmacie existante.
   * Vérifie que le pharmacien est bien le propriétaire.
   * @param id - Identifiant de la pharmacie
   * @param donnees - Données à modifier
   * @param proprietaireId - Id du pharmacien connecté
   */
  modifier: async (id: string, donnees: ModifierPharmacieDto, proprietaireId: string) => {
    const pharmacie = await pharmacieService.obtenirParId(id);

    if (pharmacie.proprietaireId !== proprietaireId) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    return pharmacieRepository.modifier(id, donnees);
  },

  /**
   * Valide une pharmacie (admin uniquement).
   * Notifie le pharmacien par Socket.io.
   * @param id - Identifiant de la pharmacie
   */
  valider: async (id: string) => {
    const pharmacie = await pharmacieService.obtenirParId(id);
    
    // Valider la pharmacie
    const pharmacieValidee = await pharmacieRepository.valider(id);
    
    // Notifier le pharmacien via Socket.io
    notifierPharmacien(
      pharmacie.proprietaireId,
      'PHARMACIE_VALIDEE',
      `Votre pharmacie "${pharmacie.nom}" a été validée !`,
      { pharmacieId: id }
    );
    
    return pharmacieValidee;
  },

  /**
   * Rejette une pharmacie (admin uniquement).
   * Notifie le pharmacien par Socket.io.
   * @param id - Identifiant de la pharmacie
   * @param motif - Motif du rejet (optionnel)
   */
  rejeter: async (id: string, motif?: string) => {
    const pharmacie = await pharmacieService.obtenirParId(id);
    
    // Supprimer la pharmacie (rejet = suppression dans ce cas)
    const pharmacieSupprimee = await pharmacieRepository.supprimer(id);
    
    // Notifier le pharmacien via Socket.io
    notifierPharmacien(
      pharmacie.proprietaireId,
      'PHARMACIE_REJETEE',
      `Votre demande de pharmacie "${pharmacie.nom}" a été refusée.`,
      { pharmacieId: id, motif }
    );
    
    return pharmacieSupprimee;
  },

  /**
   * Supprime une pharmacie.
   * @param id - Identifiant de la pharmacie
   */
  supprimer: async (id: string) => {
    await pharmacieService.obtenirParId(id);
    return pharmacieRepository.supprimer(id);
  },

  /**
   * Change le statut d'ouverture d'une pharmacie.
   * Si la pharmacie a une garde active, elle ne peut pas être fermée.
   * @param id - Identifiant de la pharmacie
   * @param estOuverte - Nouveau statut souhaité
   * @param proprietaireId - Id du pharmacien connecté
   */
  changerStatut: async (id: string, estOuverte: boolean, proprietaireId: string) => {
    const pharmacie = await pharmacieService.obtenirParId(id);

    if (pharmacie.proprietaireId !== proprietaireId) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    if (!estOuverte) {
      const gardeActive = await pharmacieRepository.aGardeActive(id);
      if (gardeActive) {
        throw new ErreurApplication(
          'Impossible de fermer une pharmacie avec une garde active',
          CODES_HTTP.REQUETE_INVALIDE
        );
      }
    }

    return pharmacieRepository.changerStatut(id, estOuverte);
  },
};

/**
 * Calcule la distance en kilomètres entre deux points GPS.
 * Utilise la formule de Haversine.
 */
function calculerDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const RAYON_TERRE_KM = 6371;
  const dLat = degresEnRadians(lat2 - lat1);
  const dLon = degresEnRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degresEnRadians(lat1)) *
    Math.cos(degresEnRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(RAYON_TERRE_KM * c * 10) / 10;
}

function degresEnRadians(degres: number): number {
  return degres * (Math.PI / 180);
}