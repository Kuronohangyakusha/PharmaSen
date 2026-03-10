"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pharmacieService = void 0;
const pharmacie_repository_1 = require("./pharmacie.repository");
const erreur_util_1 = require("../../utils/erreur.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Service des pharmacies.
 * Contient toute la logique métier.
 */
exports.pharmacieService = {
    /**
     * Récupère toutes les pharmacies validées.
     */
    obtenirToutes: () => {
        return pharmacie_repository_1.pharmacieRepository.trouverToutes();
    },
    /**
     * Récupère une pharmacie par son id ou lance une erreur 404.
     * @param id - Identifiant de la pharmacie
     */
    obtenirParId: async (id) => {
        const pharmacie = await pharmacie_repository_1.pharmacieRepository.trouverParId(id);
        if (!pharmacie) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.PHARMACIE.INTROUVABLE, codes_http_1.CODES_HTTP.INTROUVABLE);
        }
        return pharmacie;
    },
    /**
     * Recherche les pharmacies ayant un médicament disponible
     * et calcule la distance depuis la position de l'utilisateur.
     * @param nomMedicament - Nom du médicament recherché
     * @param latitude - Latitude de l'utilisateur
     * @param longitude - Longitude de l'utilisateur
     */
    rechercherParMedicament: async (nomMedicament, latitude, longitude) => {
        if (!nomMedicament.trim()) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.GENERAL.TERME_RECHERCHE_VIDE, codes_http_1.CODES_HTTP.REQUETE_INVALIDE);
        }
        const pharmacies = await pharmacie_repository_1.pharmacieRepository.rechercherParMedicament(nomMedicament);
        // Si les coordonnées GPS sont fournies, calculer et trier par distance
        if (latitude && longitude) {
            const pharmaciesAvecDistance = pharmacies.map((pharmacie) => ({
                ...pharmacie,
                distance: calculerDistanceKm(latitude, longitude, pharmacie.latitude, pharmacie.longitude),
            }));
            // Trier par distance croissante
            return pharmaciesAvecDistance.sort((a, b) => a.distance - b.distance);
        }
        return pharmacies;
    },
    /**
     * Retourne les pharmacies de garde aujourd'hui.
     */
    obtenirDeGarde: () => {
        return pharmacie_repository_1.pharmacieRepository.trouverDeGarde();
    },
    /**
     * Crée une nouvelle pharmacie pour un pharmacien.
     * @param donnees - Données de la pharmacie
     * @param proprietaireId - Id du pharmacien connecté
     */
    creer: (donnees, proprietaireId) => {
        return pharmacie_repository_1.pharmacieRepository.creer(donnees, proprietaireId);
    },
    /**
     * Modifie une pharmacie existante.
     * @param id - Identifiant de la pharmacie
     * @param donnees - Données à modifier
     */
    modifier: async (id, donnees) => {
        await exports.pharmacieService.obtenirParId(id);
        return pharmacie_repository_1.pharmacieRepository.modifier(id, donnees);
    },
    /**
     * Valide une pharmacie (admin uniquement).
     * @param id - Identifiant de la pharmacie
     */
    valider: async (id) => {
        await exports.pharmacieService.obtenirParId(id);
        return pharmacie_repository_1.pharmacieRepository.valider(id);
    },
    /**
     * Supprime une pharmacie.
     * @param id - Identifiant de la pharmacie
     */
    supprimer: async (id) => {
        await exports.pharmacieService.obtenirParId(id);
        return pharmacie_repository_1.pharmacieRepository.supprimer(id);
    },
};
/**
 * Calcule la distance en kilomètres entre deux points GPS.
 * Utilise la formule de Haversine.
 * @param lat1 - Latitude du point 1
 * @param lon1 - Longitude du point 1
 * @param lat2 - Latitude du point 2
 * @param lon2 - Longitude du point 2
 */
function calculerDistanceKm(lat1, lon1, lat2, lon2) {
    const RAYON_TERRE_KM = 6371;
    const dLat = degresEnRadians(lat2 - lat1);
    const dLon = degresEnRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degresEnRadians(lat1)) *
            Math.cos(degresEnRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(RAYON_TERRE_KM * c * 10) / 10;
}
/**
 * Convertit des degrés en radians.
 * @param degres - Valeur en degrés
 */
function degresEnRadians(degres) {
    return degres * (Math.PI / 180);
}
//# sourceMappingURL=pharmacie.service.js.map