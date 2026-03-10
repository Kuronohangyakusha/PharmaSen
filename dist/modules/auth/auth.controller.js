"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const reponse_util_1 = require("../../utils/reponse.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Contrôleur d'authentification.
 * Gère les requêtes HTTP et délègue au service.
 */
exports.authController = {
    /**
     * Inscription d'un nouveau pharmacien.
     * POST /api/auth/inscription
     */
    inscrire: async (req, res, next) => {
        try {
            const utilisateur = await auth_service_1.authService.inscrire(req.body);
            (0, reponse_util_1.repondreSucces)(res, utilisateur, messages_1.MESSAGES.AUTH.INSCRIPTION_SUCCES, codes_http_1.CODES_HTTP.CREE);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * Connexion d'un utilisateur.
     * POST /api/auth/connexion
     */
    connecter: async (req, res, next) => {
        try {
            const resultat = await auth_service_1.authService.connecter(req.body);
            (0, reponse_util_1.repondreSucces)(res, resultat, messages_1.MESSAGES.AUTH.CONNEXION_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * Récupération du profil de l'utilisateur connecté.
     * GET /api/auth/profil
     */
    obtenirProfil: async (req, res, next) => {
        try {
            const profil = await auth_service_1.authService.obtenirProfil(req.utilisateur.id);
            (0, reponse_util_1.repondreSucces)(res, profil, 'Profil récupéré avec succès');
        }
        catch (erreur) {
            next(erreur);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map