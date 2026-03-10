"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardeService = void 0;
const garde_repository_1 = require("./garde.repository");
const stock_service_1 = require("../stock/stock.service");
const erreur_util_1 = require("../../utils/erreur.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Service des gardes.
 * Contient toute la logique métier.
 */
exports.gardeService = {
    /**
     * Récupère les gardes actives aujourd'hui.
     */
    obtenirAujourdhui: () => {
        return garde_repository_1.gardeRepository.trouverAujourdhui();
    },
    /**
     * Récupère les gardes de la semaine courante.
     */
    obtenirCetteSemaine: () => {
        return garde_repository_1.gardeRepository.trouverCetteSemaine();
    },
    /**
     * Récupère une garde par son id ou lance une erreur 404.
     * @param id - Identifiant de la garde
     */
    obtenirParId: async (id) => {
        const garde = await garde_repository_1.gardeRepository.trouverParId(id);
        if (!garde) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.GARDE.INTROUVABLE, codes_http_1.CODES_HTTP.INTROUVABLE);
        }
        return garde;
    },
    /**
     * Crée une nouvelle garde pour le pharmacien connecté.
     * Vérifie que la date de fin est après la date de début.
     * @param donnees - Données de la garde
     * @param proprietaireId - Id du pharmacien connecté
     */
    creer: async (donnees, proprietaireId) => {
        // Vérifier que la date de fin est après la date de début
        if (new Date(donnees.dateFin) <= new Date(donnees.dateDebut)) {
            throw new erreur_util_1.ErreurApplication('La date de fin doit être après la date de début', codes_http_1.CODES_HTTP.REQUETE_INVALIDE);
        }
        // Récupérer la pharmacie du pharmacien
        const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
        return garde_repository_1.gardeRepository.creer(donnees, pharmacie.id);
    },
    /**
     * Modifie une garde existante.
     * @param id - Identifiant de la garde
     * @param donnees - Données à modifier
     * @param proprietaireId - Id du pharmacien connecté
     */
    modifier: async (id, donnees, proprietaireId) => {
        const garde = await exports.gardeService.obtenirParId(id);
        const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
        // Vérifier que la garde appartient à la pharmacie du pharmacien
        if (garde.pharmacieId !== pharmacie.id) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.ACCES_REFUSE, codes_http_1.CODES_HTTP.ACCES_REFUSE);
        }
        return garde_repository_1.gardeRepository.modifier(id, donnees);
    },
    /**
     * Supprime une garde.
     * @param id - Identifiant de la garde
     * @param proprietaireId - Id du pharmacien connecté
     */
    supprimer: async (id, proprietaireId) => {
        const garde = await exports.gardeService.obtenirParId(id);
        const pharmacie = await stock_service_1.stockService.obtenirPharmacieduPharmacien(proprietaireId);
        if (garde.pharmacieId !== pharmacie.id) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.ACCES_REFUSE, codes_http_1.CODES_HTTP.ACCES_REFUSE);
        }
        return garde_repository_1.gardeRepository.supprimer(id);
    },
};
//# sourceMappingURL=garde.service.js.map