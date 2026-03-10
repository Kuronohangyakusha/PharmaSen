import { Request, Response, NextFunction } from 'express';
import { ErreurApplication } from '../utils/erreur.util';
import { CODES_HTTP } from '../constantes/codes-http';
import { MESSAGES } from '../constantes/messages';

/**
 * Rôles disponibles dans l'application.
 */
type Role = 'VISITEUR' | 'PHARMACIEN' | 'ADMIN';

/**
 * Middleware de vérification du rôle utilisateur.
 * À utiliser après verifierAuth.
 * @param rolesAutorises - Liste des rôles autorisés à accéder à la route
 */
export const verifierRole = (...rolesAutorises: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.utilisateur) {
      next(
        new ErreurApplication(
          MESSAGES.AUTH.TOKEN_MANQUANT,
          CODES_HTTP.NON_AUTHENTIFIE
        )
      );
      return;
    }

    const roleUtilisateur = req.utilisateur.role as Role;
    const estAutorise = rolesAutorises.includes(roleUtilisateur);

    if (!estAutorise) {
      next(
        new ErreurApplication(
          MESSAGES.AUTH.ACCES_REFUSE,
          CODES_HTTP.ACCES_REFUSE
        )
      );
      return;
    }

    next();
  };
};