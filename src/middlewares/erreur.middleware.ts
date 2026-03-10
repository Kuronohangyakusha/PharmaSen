import { Request, Response, NextFunction } from 'express';
import { ErreurApplication } from '../utils/erreur.util';
import { repondreErreur } from '../utils/reponse.util';
import { CODES_HTTP } from '../constantes/codes-http';
import { MESSAGES } from '../constantes/messages';

/**
 * Middleware global de gestion des erreurs.
 * Intercepte toutes les erreurs propagées via next(erreur).
 */
export const gererErreurs = (
  erreur: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`❌ Erreur : ${erreur.message}`);

  // Erreur personnalisée de l'application
  if (erreur instanceof ErreurApplication) {
    repondreErreur(res, erreur.message, erreur.codeHttp);
    return;
  }

  // Erreur inconnue
  repondreErreur(
    res,
    MESSAGES.GENERAL.ERREUR_SERVEUR,
    CODES_HTTP.ERREUR_SERVEUR
  );
};