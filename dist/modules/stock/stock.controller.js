"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockController = void 0;
const stock_service_1 = require("./stock.service");
const reponse_util_1 = require("../../utils/reponse.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Contrôleur des stocks.
 */
exports.stockController = {
    /** GET /api/stocks/pharmacie/:pharmacieId */
    obtenirParPharmacie: async (req, res, next) => {
        try {
            const pharmacieId = req.params['pharmacieId'];
            const stocks = await stock_service_1.stockService.obtenirParPharmacie(pharmacieId);
            (0, reponse_util_1.repondreSucces)(res, stocks, messages_1.MESSAGES.STOCK.LISTE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** GET /api/stocks/comparateur?medicamentId= */
    comparerPrix: async (req, res, next) => {
        try {
            const medicamentId = req.query['medicamentId'];
            const comparaison = await stock_service_1.stockService.comparerPrix(medicamentId);
            (0, reponse_util_1.repondreSucces)(res, comparaison, 'Comparaison des prix effectuée');
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** POST /api/stocks */
    creer: async (req, res, next) => {
        try {
            const proprietaireId = req.utilisateur.id;
            const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
            const stock = await stock_service_1.stockService.creer(req.body, pharmacie.id);
            (0, reponse_util_1.repondreSucces)(res, stock, messages_1.MESSAGES.STOCK.CREE_SUCCES, codes_http_1.CODES_HTTP.CREE);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** PUT /api/stocks/:id */
    modifier: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const proprietaireId = req.utilisateur.id;
            const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
            const stock = await stock_service_1.stockService.modifier(id, req.body, pharmacie.id);
            (0, reponse_util_1.repondreSucces)(res, stock, messages_1.MESSAGES.STOCK.MODIFIE_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
    /** DELETE /api/stocks/:id */
    supprimer: async (req, res, next) => {
        try {
            const id = req.params['id'];
            const proprietaireId = req.utilisateur.id;
            const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
            await stock_service_1.stockService.supprimer(id, pharmacie.id);
            (0, reponse_util_1.repondreSucces)(res, null, messages_1.MESSAGES.STOCK.SUPPRIME_SUCCES);
        }
        catch (erreur) {
            next(erreur);
        }
    },
};
//# sourceMappingURL=stock.controller.js.map