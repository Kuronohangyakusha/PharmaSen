"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repondreErreur = exports.repondreSucces = void 0;
const codes_http_1 = require("../constantes/codes-http");
/**
 * Envoie une réponse JSON de succès uniforme.
 * @param res - L'objet réponse Express
 * @param donnees - Les données à retourner
 * @param message - Le message de succès
 * @param codeHttp - Le code HTTP (défaut: 200)
 */
const repondreSucces = (res, donnees, message, codeHttp = codes_http_1.CODES_HTTP.OK) => {
    res.status(codeHttp).json({
        succes: true,
        message,
        donnees,
    });
};
exports.repondreSucces = repondreSucces;
/**
 * Envoie une réponse JSON d'erreur uniforme.
 * @param res - L'objet réponse Express
 * @param message - Le message d'erreur
 * @param codeHttp - Le code HTTP (défaut: 500)
 * @param erreurs - Détails supplémentaires sur l'erreur
 */
const repondreErreur = (res, message, codeHttp = codes_http_1.CODES_HTTP.ERREUR_SERVEUR, erreurs) => {
    res.status(codeHttp).json({
        succes: false,
        message,
        erreurs,
    });
};
exports.repondreErreur = repondreErreur;
//# sourceMappingURL=reponse.util.js.map