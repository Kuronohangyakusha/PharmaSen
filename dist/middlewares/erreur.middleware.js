"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gererErreurs = void 0;
const erreur_util_1 = require("../utils/erreur.util");
const reponse_util_1 = require("../utils/reponse.util");
const codes_http_1 = require("../constantes/codes-http");
const messages_1 = require("../constantes/messages");
/**
 * Middleware global de gestion des erreurs.
 * Intercepte toutes les erreurs propagées via next(erreur).
 */
const gererErreurs = (erreur, req, res, next) => {
    console.error(`❌ Erreur : ${erreur.message}`);
    // Erreur personnalisée de l'application
    if (erreur instanceof erreur_util_1.ErreurApplication) {
        (0, reponse_util_1.repondreErreur)(res, erreur.message, erreur.codeHttp);
        return;
    }
    // Erreur inconnue
    (0, reponse_util_1.repondreErreur)(res, messages_1.MESSAGES.GENERAL.ERREUR_SERVEUR, codes_http_1.CODES_HTTP.ERREUR_SERVEUR);
};
exports.gererErreurs = gererErreurs;
//# sourceMappingURL=erreur.middleware.js.map