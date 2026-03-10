import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErreurApplication } from '../utils/erreur.util';
import { CODES_HTTP } from '../constantes/codes-http';
import { MESSAGES } from '../constantes/messages';

/**
 * Rôles disponibles dans l'application.
 */
type Role = 'VISITEUR' | 'PHARMACIEN' | 'ADMIN';

/**
 * Payload contenu dans le token JWT.
 */
interface PayloadJwt {
  id: string;
  email: string;
  role: Role;
}

/**
 * Middleware de vérification du token JWT.
 * Bloque les requêtes sans token valide.
 */
export const verifierAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const enteteAuthorization = req.headers.authorization;

    if (!enteteAuthorization || !enteteAuthorization.startsWith('Bearer ')) {
      throw new ErreurApplication(
        MESSAGES.AUTH.TOKEN_MANQUANT,
        CODES_HTTP.NON_AUTHENTIFIE
      );
    }

    const token = enteteAuthorization.split(' ')[1];
    const secret = process.env.JWT_SECRET as string;

    const payload = jwt.verify(token, secret) as PayloadJwt;

    req.utilisateur = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (erreur) {
    if (erreur instanceof ErreurApplication) {
      next(erreur);
      return;
    }
    next(
      new ErreurApplication(
        MESSAGES.AUTH.TOKEN_INVALIDE,
        CODES_HTTP.NON_AUTHENTIFIE
      )
    );
  }
};