"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockService = void 0;
const stock_repository_1 = require("./stock.repository");
const pharmacie_repository_1 = require("../pharmacie/pharmacie.repository");
const erreur_util_1 = require("../../utils/erreur.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Service des stocks.
 * Contient toute la logique métier.
 */
exports.stockService = {
    /**
     * Récupère tous les stocks d'une pharmacie.
     * @param pharmacieId - Identifiant de la pharmacie
     */
    obtenirParPharmacie: (pharmacieId) => {
        return stock_repository_1.stockRepository.trouverParPharmacie(pharmacieId);
    },
    /**
     * Récupère un stock par son id ou lance une erreur 404.
     * @param id - Identifiant du stock
     */
    obtenirParId: async (id) => {
        const stock = await stock_repository_1.stockRepository.trouverParId(id);
        if (!stock) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.STOCK.INTROUVABLE, codes_http_1.CODES_HTTP.INTROUVABLE);
        }
        return stock;
    },
    /**
     * Compare les prix d'un médicament entre toutes les pharmacies.
     * @param medicamentId - Identifiant du médicament
     */
    comparerPrix: (medicamentId) => {
        return stock_repository_1.stockRepository.comparerPrix(medicamentId);
    },
    /**
     * Ajoute un médicament au stock d'une pharmacie.
     * Vérifie que le médicament n'est pas déjà dans le stock.
     * @param donnees - Données du stock
     * @param pharmacieId - Identifiant de la pharmacie
     */
    creer: async (donnees, pharmacieId) => {
        // Vérifier que le médicament n'est pas déjà dans le stock
        const stockExistant = await stock_repository_1.stockRepository.trouverParPharmacieEtMedicament(pharmacieId, donnees.medicamentId);
        if (stockExistant) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.STOCK.DEJA_EXISTANT, codes_http_1.CODES_HTTP.CONFLIT);
        }
        return stock_repository_1.stockRepository.creer(donnees, pharmacieId);
    },
    /**
     * Modifie un stock existant.
     * @param id - Identifiant du stock
     * @param donnees - Données à modifier
     * @param pharmacieId - Id de la pharmacie du pharmacien connecté
     */
    modifier: async (id, donnees, pharmacieId) => {
        const stock = await exports.stockService.obtenirParId(id);
        // Vérifier que le stock appartient bien à la pharmacie du pharmacien
        if (stock.pharmacieId !== pharmacieId) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.ACCES_REFUSE, codes_http_1.CODES_HTTP.ACCES_REFUSE);
        }
        return stock_repository_1.stockRepository.modifier(id, donnees);
    },
    /**
     * Supprime un médicament du stock.
     * @param id - Identifiant du stock
     * @param pharmacieId - Id de la pharmacie du pharmacien connecté
     */
    supprimer: async (id, pharmacieId) => {
        const stock = await exports.stockService.obtenirParId(id);
        if (stock.pharmacieId !== pharmacieId) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.ACCES_REFUSE, codes_http_1.CODES_HTTP.ACCES_REFUSE);
        }
        return stock_repository_1.stockRepository.supprimer(id);
    },
    /**
     * Récupère la pharmacie d'un pharmacien connecté.
     * @param proprietaireId - Id du pharmacien connecté
     */
    obtenirPharmacieduPharmacien: async (proprietaireId) => {
        const pharmacie = await pharmacie_repository_1.pharmacieRepository.trouverParProprietaire(proprietaireId);
        if (!pharmacie) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.PHARMACIE.INTROUVABLE, codes_http_1.CODES_HTTP.INTROUVABLE);
        }
        return pharmacie;
    },
};
//# sourceMappingURL=stock.service.js.map