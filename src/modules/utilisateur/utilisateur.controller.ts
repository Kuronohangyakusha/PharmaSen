import { Request, Response, NextFunction } from 'express';
import { utilisateurService } from './utilisateur.service';
import { repondreSucces } from '../../utils/reponse.util';
import { MESSAGES } from '../../constantes/messages';

export const utilisateurController = {

  obtenirTous: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const utilisateurs = await utilisateurService.obtenirTous();
      repondreSucces(res, utilisateurs, MESSAGES.UTILISATEUR.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  modifierStatut: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const { estActif } = req.body;
      const utilisateur = await utilisateurService.modifierStatut(id, estActif);
      repondreSucces(res, utilisateur, MESSAGES.UTILISATEUR.MODIFIE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  supprimer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      await utilisateurService.supprimer(id);
      repondreSucces(res, null, 'Utilisateur supprimé avec succès');
    } catch (erreur) {
      next(erreur);
    }
  },
};