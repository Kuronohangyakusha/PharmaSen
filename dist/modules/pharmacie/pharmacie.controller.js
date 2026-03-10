"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pharmacieController = void 0;
const pharmacie_service_1 = require("./pharmacie.service");
const reponse_util_1 = require("../../utils/reponse.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Contrôleur des pharmacies.
 */
exports.pharmacieController = {
    /** GET /api/pharmacies */
    obtenirToutes: async (req, res, next) => {
        try {
            const pharmacies = await pharmacie_service_1.pharmacieService.obtenirToutes();
            (0, reponse_util_1.repondreSucces)(res, pharmacies, messages_1.MESSAGES.PHARMACIE.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** GET /api/pharmacies/recherche?medicament=&lat=&lng= */
    rechercher: async (req, res, next) => {
        try {
            const medicament = req.query['medicament'];
            const lat = req.query['lat'] ? Number(req.query['lat']) : undefined;
            const lng = req.query['lng'] ? Number(req.query['lng']) : undefined;
            const pharmacies = await pharmacie_service_1.pharmacieService.rechercherParMedicament(medicament, lat, lng);
            (0, reponse_util_1.repondreSucces)(res, pharmacies, messages_1.MESSAGES.PHARMACIE.RECHERCHE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** GET /api/pharmacies/garde */
    obtenirDeGarde: async (req, res, next) => {
        try {
            const pharmacies = await pharmacie_service_1.pharmacieService.obtenirDeGarde();
            (0, reponse_util_1.repondreSucces)(res, pharmacies, messages_1.MESSAGES.PHARMACIE.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** GET /api/pharmacies/:id */
    obtenirParId: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const pharmacie = await pharmacie_service_1.pharmacieService.obtenirParId(id);
            (0, reponse_util_1.repondreSucces)(res, pharmacie, messages_1.MESSAGES.PHARMACIE.TROUVE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** POST /api/pharmacies */
    creer: async (req, res, next) => {
        try {
            const proprietaireId = req.utilisateur.id;
            const pharmacie = await pharmacie_service_1.pharmacieService.creer(req.body, proprietaireId);
            (0, reponse_util_1.repondreSucces)(res, pharmacie, messages_1.MESSAGES.PHARMACIE.CREE_SUCCES, codes_http_1.CODES_HTTP.CREE);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** PUT /api/pharmacies/:id */
    modifier: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const pharmacie = await pharmacie_service_1.pharmacieService.modifier(id, req.body);
            (0, reponse_util_1.repondreSucces)(res, pharmacie, messages_1.MESSAGES.PHARMACIE.MODIFIE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** PATCH /api/pharmacies/:id/valider */
    valider: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const pharmacie = await pharmacie_service_1.pharmacieService.valider(id);
            (0, reponse_util_1.repondreSucces)(res, pharmacie, messages_1.MESSAGES.PHARMACIE.VALIDEE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** DELETE /api/pharmacies/:id */
    supprimer: async (req, res, next) => {
        try {
            const id = req.params['id'];
            await pharmacie_service_1.pharmacieService.supprimer(id);
            (0, reponse_util_1.repondreSucces)(res, null, messages_1.MESSAGES.PHARMACIE.SUPPRIME_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
};
//# sourceMappingURL=pharmacie.controller.js.map