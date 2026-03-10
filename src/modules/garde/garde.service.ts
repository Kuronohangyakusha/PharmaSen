import { gardeRepository } from './garde.repository';
import { stockService } from '../stock/stock.service';
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
   * Crée une nouvelle garde pour le pharmacien connecté.
   * Vérifie que la date de fin est après la date de début.
   * @param donnees - Données de la garde
   * @param proprietaireId - Id du pharmacien connecté
   */
  creer: async (donnees: CreerGardeDto, proprietaireId: string) => {
    // Vérifier que la date de fin est après la date de début
    if (new Date(donnees.dateFin) <= new Date(donnees.dateDebut)) {
      throw new ErreurApplication(
        'La date de fin doit être après la date de début',
        CODES_HTTP.REQUETE_INVALIDE
      );
    }

    // Récupérer la pharmacie du pharmacien
    const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);
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
    const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);

    // Vérifier que la garde appartient à la pharmacie du pharmacien
    if (garde.pharmacieId !== pharmacie.id) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
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
    const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);

    if (garde.pharmacieId !== pharmacie.id) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    return gardeRepository.supprimer(id);
  },
};