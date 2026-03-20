import { Request, Response, NextFunction } from 'express';
import { medicamentService } from './medicament.service';
import { repondreSucces } from '../../utils/reponse.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

/**
 * Contrôleur des médicaments.
 * Gère les requêtes HTTP et délègue au service.
 */
export const medicamentController = {

  /**
   * GET /api/medicaments
   */
  obtenirTous: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicaments = await medicamentService.obtenirTous();
      repondreSucces(res, medicaments, MESSAGES.MEDICAMENT.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * GET /api/medicaments/recherche?q=
   */
  rechercher: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const terme = req.query.q as string;
      const resultats = await medicamentService.rechercher(terme);
      repondreSucces(res, resultats, MESSAGES.MEDICAMENT.RECHERCHE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

   /**
   * GET /api/medicaments/:id
   */
  obtenirParId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const medicament = await medicamentService.obtenirParId(id);
      repondreSucces(res, medicament, MESSAGES.MEDICAMENT.TROUVE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * POST /api/medicaments
   */
  creer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicament = await medicamentService.creer(req.body);
      repondreSucces(res, medicament, MESSAGES.MEDICAMENT.CREE_SUCCES, CODES_HTTP.CREE);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * PUT /api/medicaments/:id
   */
  modifier: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const medicament = await medicamentService.modifier(id, req.body);
      repondreSucces(res, medicament, MESSAGES.MEDICAMENT.MODIFIE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /**
   * DELETE /api/medicaments/:id
   */
  supprimer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      await medicamentService.supprimer(id);
      repondreSucces(res, null, MESSAGES.MEDICAMENT.SUPPRIME_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },
};