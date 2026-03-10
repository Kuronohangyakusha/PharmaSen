"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErreurApplication = void 0;
const codes_http_1 = require("../constantes/codes-http");
/**
 * Classe d'erreur personnalisée pour l'application pharmaSen.
 * Permet de transporter le code HTTP avec le message d'erreur.
 */
class ErreurApplication extends Error {
    constructor(message, codeHttp = codes_http_1.CODES_HTTP.ERREUR_SERVEUR) {
        super(message);
        this.codeHttp = codeHttp;
        this.name = 'ErreurApplication';
    }
}
exports.ErreurApplication = ErreurApplication;
//# sourceMappingURL=erreur.util.js.map