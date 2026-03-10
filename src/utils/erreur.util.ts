import { CODES_HTTP } from '../constantes/codes-http';

/**
 * Classe d'erreur personnalisée pour l'application pharmaSen.
 * Permet de transporter le code HTTP avec le message d'erreur.
 */
export class ErreurApplication extends Error {
  public readonly codeHttp: number;

  constructor(message: string, codeHttp: number = CODES_HTTP.ERREUR_SERVEUR) {
    super(message);
    this.codeHttp = codeHttp;
    this.name = 'ErreurApplication';
  }
}
