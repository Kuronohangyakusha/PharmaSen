"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifierAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const erreur_util_1 = require("../utils/erreur.util");
const codes_http_1 = require("../constantes/codes-http");
const messages_1 = require("../constantes/messages");
/**
 * Middleware de vérification du token JWT.
 * Bloque les requêtes sans token valide.
 */
const verifierAuth = (req, res, next) => {
    try {
        const enteteAuthorization = req.headers.authorization;
        if (!enteteAuthorization || !enteteAuthorization.startsWith('Bearer ')) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.TOKEN_MANQUANT, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE);
        }
        const token = enteteAuthorization.split(' ')[1];
        const secret = process.env.JWT_SECRET;
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.utilisateur = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        };
        next();
    }
    catch (erreur) {
        if (erreur instanceof erreur_util_1.ErreurApplication) {
            next(erreur);
            return;
        }
        next(new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.TOKEN_INVALIDE, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE));
    }
};
exports.verifierAuth = verifierAuth;
//# sourceMappingURL=auth.middleware.js.map