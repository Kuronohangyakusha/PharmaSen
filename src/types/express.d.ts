/**
 * Extension du type Request d'Express pour inclure
 * les informations de l'utilisateur connecté.
 */
declare global {
  namespace Express {
    interface Request {
      utilisateur?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export {};