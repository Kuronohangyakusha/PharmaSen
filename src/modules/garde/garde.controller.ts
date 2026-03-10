import { Request, Response, NextFunction } from 'express';
import { gardeService } from './garde.service';
import { repondreSucces } from '../../utils/reponse.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

/**
 * Contrôleur des gardes.
 */
export const gardeController = {

  /** GET /api/gardes/aujourd-hui */
  obtenirAujourdhui: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gardes = await gardeService.obtenirAujourdhui();
      repondreSucces(res, gardes, MESSAGES.GARDE.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** GET /api/gardes/cette-semaine */
  obtenirCetteSemaine: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gardes = await gardeService.obtenirCetteSemaine();
      repondreSucces(res, gardes, MESSAGES.GARDE.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** POST /api/gardes */
  creer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const proprietaireId = req.utilisateur!.id;
      const garde = await gardeService.creer(req.body, proprietaireId);
      repondreSucces(res, garde, MESSAGES.GARDE.CREE_SUCCES, CODES_HTTP.CREE);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** PUT /api/gardes/:id */
  modifier: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const proprietaireId = req.utilisateur!.id;
      const garde = await gardeService.modifier(id, req.body, proprietaireId);
      repondreSucces(res, garde, MESSAGES.GARDE.MODIFIE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** DELETE /api/gardes/:id */
  supprimer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const proprietaireId = req.utilisateur!.id;
      await gardeService.supprimer(id, proprietaireId);
      repondreSucces(res, null, MESSAGES.GARDE.SUPPRIME_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },
};