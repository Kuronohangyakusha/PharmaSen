import { Request, Response, NextFunction } from 'express';
import { stockService } from './stock.service';
import { repondreSucces } from '../../utils/reponse.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';

/**
 * Contrôleur des stocks.
 */
export const stockController = {

  /** GET /api/stocks/pharmacie/:pharmacieId */
  obtenirParPharmacie: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacieId = req.params['pharmacieId'] as string;
      const stocks = await stockService.obtenirParPharmacie(pharmacieId);
      repondreSucces(res, stocks, MESSAGES.STOCK.LISTE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** GET /api/stocks/comparateur?medicamentId= */
  comparerPrix: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicamentId = req.query['medicamentId'] as string;
      const comparaison = await stockService.comparerPrix(medicamentId);
      repondreSucces(res, comparaison, 'Comparaison des prix effectuée');
    } catch (erreur) {
      next(erreur);
    }
  },

  /** POST /api/stocks */
  creer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const proprietaireId = req.utilisateur!.id;
      const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);
      const stock = await stockService.creer(req.body, pharmacie.id);
      repondreSucces(res, stock, MESSAGES.STOCK.CREE_SUCCES, CODES_HTTP.CREE);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** PUT /api/stocks/:id */
  modifier: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const proprietaireId = req.utilisateur!.id;
      const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);
      const stock = await stockService.modifier(id, req.body, pharmacie.id);
      repondreSucces(res, stock, MESSAGES.STOCK.MODIFIE_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },

  /** DELETE /api/stocks/:id */
  supprimer: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'] as string;
      const proprietaireId = req.utilisateur!.id;
      const pharmacie = await stockService.obtenirPharmacieduPharmacien(proprietaireId);
      await stockService.supprimer(id, pharmacie.id);
      repondreSucces(res, null, MESSAGES.STOCK.SUPPRIME_SUCCES);
    } catch (erreur) {
      next(erreur);
    }
  },
};