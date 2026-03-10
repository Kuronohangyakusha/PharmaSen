import { Request, Response, NextFunction } from 'express';
import { pharmacieService } from './pharmacie.service';
import { repondreSucces } from '../../utils/reponse.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

/**
 * Contrôleur des pharmacies.
 */
export const pharmacieController = {

  /** GET /api/pharmacies */
  obtenirToutes: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacies = await pharmacieService.obtenirToutes();
      repondreSucces(res, pharmacies, MESSAGES.PHARMACIE.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** GET /api/pharmacies/recherche?medicament=&lat=&lng= */
  rechercher: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicament = req.query['medicament'] as string;
      const lat = req.query['lat'] ? Number(req.query['lat']) : undefined;
      const lng = req.query['lng'] ? Number(req.query['lng']) : undefined;
      const pharmacies = await pharmacieService.rechercherParMedicament(medicament, lat, lng);
      repondreSucces(res, pharmacies, MESSAGES.PHARMACIE.RECHERCHE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** GET /api/pharmacies/garde */
  obtenirDeGarde: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacies = await pharmacieService.obtenirDeGarde();
      repondreSucces(res, pharmacies, MESSAGES.PHARMACIE.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** GET /api/pharmacies/:id */
  obtenirParId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const pharmacie = await pharmacieService.obtenirParId(id);
      repondreSucces(res, pharmacie, MESSAGES.PHARMACIE.TROUVE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** POST /api/pharmacies */
  creer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const proprietaireId = req.utilisateur!.id;
      const pharmacie = await pharmacieService.creer(req.body, proprietaireId);
      repondreSucces(res, pharmacie, MESSAGES.PHARMACIE.CREE_SUCCES, CODES_HTTP.CREE);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** PUT /api/pharmacies/:id */
  modifier: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const pharmacie = await pharmacieService.modifier(id, req.body);
      repondreSucces(res, pharmacie, MESSAGES.PHARMACIE.MODIFIE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** PATCH /api/pharmacies/:id/valider */
  valider: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const pharmacie = await pharmacieService.valider(id);
      repondreSucces(res, pharmacie, MESSAGES.PHARMACIE.VALIDEE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** DELETE /api/pharmacies/:id */
  supprimer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      await pharmacieService.supprimer(id);
      repondreSucces(res, null, MESSAGES.PHARMACIE.SUPPRIME_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },
};