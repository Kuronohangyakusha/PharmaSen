"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardeController = void 0;
const garde_service_1 = require("./garde.service");
const reponse_util_1 = require("../../utils/reponse.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Contrôleur des gardes.
 */
exports.gardeController = {
    /** GET /api/gardes/aujourd-hui */
    obtenirAujourdhui: async (req, res, next) => {
        try {
            const gardes = await garde_service_1.gardeService.obtenirAujourdhui();
            (0, reponse_util_1.repondreSucces)(res, gardes, messages_1.MESSAGES.GARDE.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** GET /api/gardes/cette-semaine */
    obtenirCetteSemaine: async (req, res, next) => {
        try {
            const gardes = await garde_service_1.gardeService.obtenirCetteSemaine();
            (0, reponse_util_1.repondreSucces)(res, gardes, messages_1.MESSAGES.GARDE.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** POST /api/gardes */
    creer: async (req, res, next) => {
        try {
            const proprietaireId = req.utilisateur.id;
            const garde = await garde_service_1.gardeService.creer(req.body, proprietaireId);
            (0, reponse_util_1.repondreSucces)(res, garde, messages_1.MESSAGES.GARDE.CREE_SUCCES, codes_http_1.CODES_HTTP.CREE);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** PUT /api/gardes/:id */
    modifier: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const proprietaireId = req.utilisateur.id;
            const garde = await garde_service_1.gardeService.modifier(id, req.body, proprietaireId);
            (0, reponse_util_1.repondreSucces)(res, garde, messages_1.MESSAGES.GARDE.MODIFIE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** DELETE /api/gardes/:id */
    supprimer: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const proprietaireId = req.utilisateur.id;
            await garde_service_1.gardeService.supprimer(id, proprietaireId);
            (0, reponse_util_1.repondreSucces)(res, null, messages_1.MESSAGES.GARDE.SUPPRIME_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
};
//# sourceMappingURL=garde.controller.js.map