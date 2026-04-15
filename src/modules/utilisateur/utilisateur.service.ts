import { utilisateurRepository } from './utilisateur.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

export const utilisateurService = {

  obtenirTous: async () => {
    return utilisateurRepository.trouverTous();
  },

  modifierStatut: async (id: string, estActif: boolean) => {
    const utilisateur = await utilisateurRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(MESSAGES.UTILISATEUR.INTROUVABLE, CODES_HTTP.INTROUVABLE);
    }
    return utilisateurRepository.modifier(id, { estActif });
  },

  supprimer: async (id: string) => {
    const utilisateur = await utilisateurRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(MESSAGES.UTILISATEUR.INTROUVABLE, CODES_HTTP.INTROUVABLE);
    }
    return utilisateurRepository.supprimer(id);
  },
};