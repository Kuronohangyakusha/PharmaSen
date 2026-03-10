"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifierRole = void 0;
const erreur_util_1 = require("../utils/erreur.util");
const codes_http_1 = require("../constantes/codes-http");
const messages_1 = require("../constantes/messages");
/**
 * Middleware de vérification du rôle utilisateur.
 * À utiliser après verifierAuth.
 * @param rolesAutorises - Liste des rôles autorisés à accéder à la route
 */
const verifierRole = (...rolesAutorises) => {
    return (req, res, next) => {
        if (!req.utilisateur) {
            next(new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.TOKEN_MANQUANT, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE));
            return;
        }
        const roleUtilisateur = req.utilisateur.role;
        const estAutorise = rolesAutorises.includes(roleUtilisateur);
        if (!estAutorise) {
            next(new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.ACCES_REFUSE, codes_http_1.CODES_HTTP.ACCES_REFUSE));
            return;
        }
        next();
    };
};
exports.verifierRole = verifierRole;
//# sourceMappingURL=role.middleware.js.map