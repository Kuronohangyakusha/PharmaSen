"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicamentController = void 0;
const medicament_service_1 = require("./medicament.service");
const reponse_util_1 = require("../../utils/reponse.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Contrôleur des médicaments.
 * Gère les requêtes HTTP et délègue au service.
 */
exports.medicamentController = {
    /**
     * GET /api/medicaments
     */
    obtenirTous: async (req, res, next) => {
        try {
            const medicaments = await medicament_service_1.medicamentService.obtenirTous();
            (0, reponse_util_1.repondreSucces)(res, medicaments, messages_1.MESSAGES.MEDICAMENT.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * GET /api/medicaments/recherche?q=
     */
    rechercher: async (req, res, next) => {
        try {
            const terme = req.query.q;
            const resultats = await medicament_service_1.medicamentService.rechercher(terme);
            (0, reponse_util_1.repondreSucces)(res, resultats, messages_1.MESSAGES.MEDICAMENT.RECHERCHE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
    * GET /api/medicaments/:id
    */
    obtenirParId: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const medicament = await medicament_service_1.medicamentService.obtenirParId(id);
            (0, reponse_util_1.repondreSucces)(res, medicament, messages_1.MESSAGES.MEDICAMENT.TROUVE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * POST /api/medicaments
     */
    creer: async (req, res, next) => {
        try {
            const medicament = await medicament_service_1.medicamentService.creer(req.body);
            (0, reponse_util_1.repondreSucces)(res, medicament, messages_1.MESSAGES.MEDICAMENT.CREE_SUCCES, codes_http_1.CODES_HTTP.CREE);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * PUT /api/medicaments/:id
     */
    modifier: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const medicament = await medicament_service_1.medicamentService.modifier(id, req.body);
            (0, reponse_util_1.repondreSucces)(res, medicament, messages_1.MESSAGES.MEDICAMENT.MODIFIE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /**
     * DELETE /api/medicaments/:id
     */
    /**
     * DELETE /api/medicaments/:id
     */
    supprimer: async (req, res, next) => {
        try {
            const id = req.params['id'];
            await medicament_service_1.medicamentService.supprimer(id);
            (0, reponse_util_1.repondreSucces)(res, null, messages_1.MESSAGES.MEDICAMENT.SUPPRIME_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
};
//# sourceMappingURL=medicament.controller.js.map