"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicamentService = void 0;
const medicament_repository_1 = require("./medicament.repository");
const erreur_util_1 = require("../../utils/erreur.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Service des médicaments.
 * Contient toute la logique métier.
 */
exports.medicamentService = {
    /**
     * Récupère tous les médicaments.
     */
    obtenirTous: () => {
        return medicament_repository_1.medicamentRepository.trouverTous();
    },
    /**
     * Récupère un médicament par son id ou lance une erreur 404.
     * @param id - Identifiant du médicament
     */
    obtenirParId: async (id) => {
        const medicament = await medicament_repository_1.medicamentRepository.trouverParId(id);
        if (!medicament) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.MEDICAMENT.INTROUVABLE, codes_http_1.CODES_HTTP.INTROUVABLE);
        }
        return medicament;
    },
    /**
     * Recherche des médicaments par nom.
     * @param terme - Terme saisi par l'utilisateur
     */
    rechercher: async (terme) => {
        if (!terme.trim()) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.GENERAL.TERME_RECHERCHE_VIDE, codes_http_1.CODES_HTTP.REQUETE_INVALIDE);
        }
        return medicament_repository_1.medicamentRepository.rechercherParNom(terme);
    },
    /**
     * Crée un nouveau médicament.
     * @param donnees - Données validées du médicament
     */
    creer: (donnees) => {
        return medicament_repository_1.medicamentRepository.creer(donnees);
    },
    /**
     * Modifie un médicament existant.
     * @param id - Identifiant du médicament
     * @param donnees - Données à modifier
     */
    modifier: async (id, donnees) => {
        await exports.medicamentService.obtenirParId(id);
        return medicament_repository_1.medicamentRepository.modifier(id, donnees);
    },
    /**
     * Supprime un médicament.
     * @param id - Identifiant du médicament
     */
    supprimer: async (id) => {
        await exports.medicamentService.obtenirParId(id);
        return medicament_repository_1.medicamentRepository.supprimer(id);
    },
};
//# sourceMappingURL=medicament.service.js.map