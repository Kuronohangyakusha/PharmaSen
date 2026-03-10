import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ErreurApplication } from '../utils/erreur.util';
import { CODES_HTTP } from '../constantes/codes-http';
import { MESSAGES } from '../constantes/messages';

/**
 * Middleware de validation des données de la requête via un schéma Zod.
 * Valide req.body par défaut.
 * @param schema - Le schéma Zod à utiliser pour la validation
 */
export const valider = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const resultat = schema.safeParse(req.body);

    if (!resultat.success) {
        const erreurs = resultat.error.issues.map((e) => ({
        champ: e.path.join('.'),
        message: e.message,
    }));

      next(
        new ErreurApplication(
          MESSAGES.GENERAL.REQUETE_INVALIDE,
          CODES_HTTP.REQUETE_INVALIDE
        )
      );
      return;
    }

    // Remplacer req.body par les données validées et nettoyées
    req.body = resultat.data;
    next();
  };
};