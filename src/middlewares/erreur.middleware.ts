import { Request, Response, NextFunction } from 'express';
import { ErreurApplication } from '../utils/erreur.util';
import { repondreErreur } from '../utils/reponse.util';
import { CODES_HTTP } from '../constantes/codes-http';
import { MESSAGES } from '../constantes/messages';
import logger from '../services/logger.service';

export const gererErreurs = (
  erreur: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`❌ Erreur ${req.method} ${req.url}: ${erreur.message}`, erreur);

  if (erreur instanceof ErreurApplication) {
    repondreErreur(res, erreur.message, erreur.codeHttp);
    return;
  }

  repondreErreur(
    res,
    MESSAGES.GENERAL.ERREUR_SERVEUR,
    CODES_HTTP.ERREUR_SERVEUR
  );
};