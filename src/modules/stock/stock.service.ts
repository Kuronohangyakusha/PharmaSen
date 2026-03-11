import { stockRepository } from './stock.repository';
import { pharmacieRepository } from '../pharmacie/pharmacie.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import { CreerStockDto, ModifierStockDto } from './stock.schema';

/**
 * Service des stocks.
 * Contient toute la logique métier.
 */
export const stockService = {

  /**
   * Récupère tous les stocks d'une pharmacie.
   * @param pharmacieId - Identifiant de la pharmacie
   */
  obtenirParPharmacie: (pharmacieId: string) => {
    return stockRepository.trouverParPharmacie(pharmacieId);
  },

  /**
   * Récupère un stock par son id ou lance une erreur 404.
   * @param id - Identifiant du stock
   */
  obtenirParId: async (id: string) => {
    const stock = await stockRepository.trouverParId(id);
    if (!stock) {
      throw new ErreurApplication(
        MESSAGES.STOCK.INTROUVABLE,
        CODES_HTTP.INTROUVABLE
      );
    }
    return stock;
  },

  /**
   * Compare les prix d'un médicament entre toutes les pharmacies ouvertes.
   * @param medicamentId - Identifiant du médicament
   */
  comparerPrix: (medicamentId: string) => {
    return stockRepository.comparerPrix(medicamentId);
  },

  /**
   * Ajoute un médicament au stock d'une pharmacie.
   * Vérifie que la pharmacie est validée et que le médicament n'est pas déjà dans le stock.
   * @param donnees - Données du stock
   * @param proprietaireId - Identifiant du pharmacien connecté
   */
  creer: async (donnees: CreerStockDto, proprietaireId: string) => {
    const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);

    // Vérifier que la pharmacie est validée par l'admin
    if (!pharmacie.estValidee) {
      throw new ErreurApplication(
        'Votre pharmacie doit être validée par un administrateur pour gérer le stock',
        CODES_HTTP.ACCES_REFUSE
      );
    }

    // Vérifier que le médicament n'est pas déjà dans le stock
    const stockExistant = await stockRepository.trouverParPharmacieEtMedicament(
      pharmacie.id,
      donnees.medicamentId
    );

    if (stockExistant) {
      throw new ErreurApplication(
        MESSAGES.STOCK.DEJA_EXISTANT,
        CODES_HTTP.CONFLIT
      );
    }

    return stockRepository.creer(donnees, pharmacie.id);
  },

  /**
   * Modifie un stock existant.
   * @param id - Identifiant du stock
   * @param donnees - Données à modifier
   * @param pharmacieId - Id de la pharmacie du pharmacien connecté
   */
  modifier: async (id: string, donnees: ModifierStockDto, pharmacieId: string) => {
    const stock = await stockService.obtenirParId(id);

    // Vérifier que le stock appartient bien à la pharmacie du pharmacien
    if (stock.pharmacieId !== pharmacieId) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    return stockRepository.modifier(id, donnees);
  },

  /**
   * Supprime un médicament du stock.
   * @param id - Identifiant du stock
   * @param pharmacieId - Id de la pharmacie du pharmacien connecté
   */
  supprimer: async (id: string, pharmacieId: string) => {
    const stock = await stockService.obtenirParId(id);

    if (stock.pharmacieId !== pharmacieId) {
      throw new ErreurApplication(
        MESSAGES.AUTH.ACCES_REFUSE,
        CODES_HTTP.ACCES_REFUSE
      );
    }

    return stockRepository.supprimer(id);
  },

  /**
   * Récupère la pharmacie d'un pharmacien connecté.
   * Lance une erreur 404 si le pharmacien n'a pas encore de pharmacie.
   * @param proprietaireId - Id du pharmacien connecté
   */
  obtenirPharmacieduPharmacien: async (proprietaireId: string) => {
    const pharmacie = await pharmacieRepository.trouverParProprietaire(proprietaireId);
    if (!pharmacie) {
      throw new ErreurApplication(
        MESSAGES.PHARMACIE.INTROUVABLE,
        CODES_HTTP.INTROUVABLE
      );
    }
    return pharmacie;
  },
};