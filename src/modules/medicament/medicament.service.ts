import { medicamentRepository } from './medicament.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import { CreerMedicamentDto, ModifierMedicamentDto } from './medicament.schema';

/**
 * Service des médicaments.
 * Contient toute la logique métier.
 */
export const medicamentService = {

  /**
   * Récupère tous les médicaments.
   */
  obtenirTous: () => {
    return medicamentRepository.trouverTous();
  },

  /**
   * Récupère un médicament par son id ou lance une erreur 404.
   * @param id - Identifiant du médicament
   */
  obtenirParId: async (id: string) => {
    const medicament = await medicamentRepository.trouverParId(id);
    if (!medicament) {
      throw new ErreurApplication(
        MESSAGES.MEDICAMENT.INTROUVABLE,
        CODES_HTTP.INTROUVABLE
      );
    }
    return medicament;
  },

  /**
   * Recherche des médicaments par nom.
   * @param terme - Terme saisi par l'utilisateur
   */
  rechercher: async (terme: string) => {
    if (!terme.trim()) {
      throw new ErreurApplication(
        MESSAGES.GENERAL.TERME_RECHERCHE_VIDE,
        CODES_HTTP.REQUETE_INVALIDE
      );
    }
    return medicamentRepository.rechercherParNom(terme);
  },

  /**
   * Crée un nouveau médicament.
   * @param donnees - Données validées du médicament
   */
  creer: (donnees: CreerMedicamentDto) => {
    return medicamentRepository.creer(donnees);
  },

  /**
   * Modifie un médicament existant.
   * @param id - Identifiant du médicament
   * @param donnees - Données à modifier
   */
  modifier: async (id: string, donnees: ModifierMedicamentDto) => {
    await medicamentService.obtenirParId(id);
    return medicamentRepository.modifier(id, donnees);
  },

  /**
   * Supprime un médicament.
   * @param id - Identifiant du médicament
   */
  supprimer: async (id: string) => {
    await medicamentService.obtenirParId(id);
    return medicamentRepository.supprimer(id);
  },
};