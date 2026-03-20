import { gardeRepository } from './garde.repository';
import { pharmacieRepository } from '../pharmacie/pharmacie.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import { CreerGardeDto, ModifierGardeDto } from './garde.schema';

/**
 * Service des gardes.
 * Contient toute la logique métier.
 */
export const gardeService = {

  /**
   * Récupère les gardes actives aujourd'hui.
   */
  obtenirAujourdhui: () => {
    return gardeRepository.trouverAujourdhui();
  },

  /**
   * Récupère les gardes de la semaine courante.
   */
  obtenirCetteSemaine: () => {
    return gardeRepository.trouverCetteSemaine();
  },

  /**
   * Récupère une garde par son id ou lance une erreur 404.
   * @param id - Identifiant de la garde
   */
  obtenirParId: async (id: string) => {
    const garde = await gardeRepository.trouverParId(id);
    if (!garde) {
      throw new ErreurApplication(
        MESSAGES.GARDE.INTROUVABLE,
        CODES_HTTP.INTROUVABLE
      );
    }
    return garde;
  },

  /**
   * Crée une nouvelle garde pour la pharmacie du pharmacien connecté.
   * Vérifie que la pharmacie est validée avant de créer la garde.
   * @param donnees - Données de la garde
   * @param proprietaireId - Id du pharmacien connecté
   */
  creer: async (donnees: CreerGardeDto, proprietaireId: string) => {
    const pharmacie = await pharmacieRepository.trouverParProprietaire(proprietaireId);
    if (!pharmacie) {
      throw new ErreurApplication(
        'Vous n\'avez pas encore de pharmacie. Créez d\'abord votre pharmacie pour déclarer une garde.',
        CODES_HTTP.INTROUVABLE
      );
    }

    // Vérifier que la pharmacie est validée par l'admin
    if (!pharmacie.estValidee) {
      throw new ErreurApplication(
        'Votre pharmacie doit être validée par un administrateur pour déclarer une garde',
        CODES_HTTP.ACCES_REFUSE
      );
    }

    // Vérifier que les dates sont cohérentes
    if (new Date(donnees.dateDebut) >= new Date(donnees.dateFin)) {
      throw new ErreurApplication(
        'La date de début doit être antérieure à la date de fin',
        CODES_HTTP.REQUETE_INVALIDE
      );
    }

    return gardeRepository.creer(donnees, pharmacie.id);
  },

  /**
   * Modifie une garde existante.
   * @param id - Identifiant de la garde
   * @param donnees - Données à modifier
   * @param proprietaireId - Id du pharmacien connecté
   */
  modifier: async (id: string, donnees: ModifierGardeDto, proprietaireId: string) => {
    const garde = await gardeService.obtenirParId(id);
    const pharmacie = await pharmacieRepository.trouverParProprietaire(proprietaireId);

    if (!pharmacie) {
      throw new ErreurApplication(
        'Vous n\'avez pas de pharmacie',
        CODES_HTTP.INTROUVABLE
      );
    }

    // Vérifier que la garde appartient à la pharmacie du pharmacien
    if (garde.pharmacieId !== pharmacie.id) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    // Vérifier la cohérence des dates si les deux sont fournies
    if (donnees.dateDebut && donnees.dateFin) {
      if (new Date(donnees.dateDebut) >= new Date(donnees.dateFin)) {
        throw new ErreurApplication(
          'La date de début doit être antérieure à la date de fin',
          CODES_HTTP.REQUETE_INVALIDE
        );
      }
    }

    return gardeRepository.modifier(id, donnees);
  },

  /**
   * Supprime une garde.
   * @param id - Identifiant de la garde
   * @param proprietaireId - Id du pharmacien connecté
   */
  supprimer: async (id: string, proprietaireId: string) => {
    const garde = await gardeService.obtenirParId(id);
    const pharmacie = await pharmacieRepository.trouverParProprietaire(proprietaireId);

    if (!pharmacie) {
      throw new ErreurApplication(
        'Vous n\'avez pas de pharmacie',
        CODES_HTTP.INTROUVABLE
      );
    }

    if (garde.pharmacieId !== pharmacie.id) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    return gardeRepository.supprimer(id);
  },
};