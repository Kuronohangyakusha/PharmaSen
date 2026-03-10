"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valider = void 0;
const erreur_util_1 = require("../utils/erreur.util");
const codes_http_1 = require("../constantes/codes-http");
const messages_1 = require("../constantes/messages");
/**
 * Middleware de validation des données de la requête via un schéma Zod.
 * Valide req.body par défaut.
 * @param schema - Le schéma Zod à utiliser pour la validation
 */
const valider = (schema) => {
    return (req, res, next) => {
        const resultat = schema.safeParse(req.body);
        if (!resultat.success) {
            const erreurs = resultat.error.issues.map((e) => ({
                champ: e.path.join('.'),
                message: e.message,
            }));
            next(new erreur_util_1.ErreurApplication(messages_1.MESSAGES.GENERAL.REQUETE_INVALIDE, codes_http_1.CODES_HTTP.REQUETE_INVALIDE));
            return;
        }
        // Remplacer req.body par les données validées et nettoyées
        req.body = resultat.data;
        next();
    };
};
exports.valider = valider;
//# sourceMappingURL=validation.middleware.js.map