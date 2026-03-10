"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODES_HTTP = void 0;
/**
 * Codes de statut HTTP utilisés dans l'application pharmaSen.
 * Centralisés ici pour éviter les nombres magiques dans le code.
 */
exports.CODES_HTTP = {
    // Succès
    OK: 200, // Requête réussie
    CREE: 201, // Ressource créée avec succès
    PAS_DE_CONTENU: 204, // Succès sans contenu à retourner
    // Erreurs client
    REQUETE_INVALIDE: 400, // Données envoyées incorrectes
    NON_AUTHENTIFIE: 401, // Token manquant ou invalide
    ACCES_REFUSE: 403, // Authentifié mais pas autorisé
    INTROUVABLE: 404, // Ressource inexistante
    CONFLIT: 409, // Ressource déjà existante
    // Erreurs serveur
    ERREUR_SERVEUR: 500, // Erreur interne non gérée
};
//# sourceMappingURL=codes-http.js.map