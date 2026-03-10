import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { repondreSucces } from '../../utils/reponse.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

/**
 * Contrôleur d'authentification.
 * Gère les requêtes HTTP et délègue au service.
 */
export const authController = {

  /**
   * Inscription d'un nouveau pharmacien.
   * POST /api/auth/inscription
   */
  inscrire: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const utilisateur = await authService.inscrire(req.body);
      repondreSucces(res, utilisateur, MESSAGES.AUTH.INSCRIPTION_SUCCES, CODES_HTTP.CREE);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * Connexion d'un utilisateur.
   * POST /api/auth/connexion
   */
  connecter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const resultat = await authService.connecter(req.body);
      repondreSucces(res, resultat, MESSAGES.AUTH.CONNEXION_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * Récupération du profil de l'utilisateur connecté.
   * GET /api/auth/profil
   */
  obtenirProfil: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profil = await authService.obtenirProfil(req.utilisateur!.id);
      repondreSucces(res, profil, 'Profil récupéré avec succès');
    } catch (erreur) {
      next(erreur);
    }
  },
};