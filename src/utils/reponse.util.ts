import { Response } from 'express';
import { CODES_HTTP } from '../constantes/codes-http';

/**
 * Envoie une réponse JSON de succès uniforme.
 * @param res - L'objet réponse Express
 * @param donnees - Les données à retourner
 * @param message - Le message de succès
 * @param codeHttp - Le code HTTP (défaut: 200)
 */
export const repondreSucces = (
  res: Response,
  donnees: unknown,
  message: string,
  codeHttp: number = CODES_HTTP.OK
): void => {
  res.status(codeHttp).json({
    succes: true,
    message,
    donnees,
  });
};

/**
 * Envoie une réponse JSON d'erreur uniforme.
 * @param res - L'objet réponse Express
 * @param message - Le message d'erreur
 * @param codeHttp - Le code HTTP (défaut: 500)
 * @param erreurs - Détails supplémentaires sur l'erreur
 */
export const repondreErreur = (
  res: Response,
  message: string,
  codeHttp: number = CODES_HTTP.ERREUR_SERVEUR,
  erreurs?: unknown
): void => {
  res.status(codeHttp).json({
    succes: false,
    message,
    erreurs,
  });
};