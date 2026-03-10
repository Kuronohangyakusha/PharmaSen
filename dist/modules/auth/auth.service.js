"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = require("./auth.repository");
const erreur_util_1 = require("../../utils/erreur.util");
const codes_http_1 = require("../../constantes/codes-http");
const messages_1 = require("../../constantes/messages");
/**
 * Service d'authentification.
 * Contient la logique métier pour l'inscription et la connexion.
 */
exports.authService = {
    /**
     * Inscrit un nouveau pharmacien.
     * Vérifie que l'email n'est pas déjà utilisé et hache le mot de passe.
     * @param donnees - Données d'inscription validées
     */
    inscrire: async (donnees) => {
        // Vérifier si l'email est déjà utilisé
        const utilisateurExistant = await auth_repository_1.authRepository.trouverParEmail(donnees.email);
        if (utilisateurExistant) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.EMAIL_DEJA_UTILISE, codes_http_1.CODES_HTTP.CONFLIT);
        }
        // Hacher le mot de passe
        const rounds = Number(process.env.BCRYPT_ROUNDS) || 12;
        const motDePasseHache = await bcrypt_1.default.hash(donnees.motDePasse, rounds);
        // Créer l'utilisateur avec le rôle PHARMACIEN
        const nouvelUtilisateur = await auth_repository_1.authRepository.creerUtilisateur({
            nom: donnees.nom,
            email: donnees.email,
            motDePasse: motDePasseHache,
            role: 'PHARMACIEN',
        });
        return nouvelUtilisateur;
    },
    /**
     * Connecte un utilisateur et retourne un token JWT.
     * @param donnees - Email et mot de passe de connexion
     */
    connecter: async (donnees) => {
        // Vérifier si l'utilisateur existe
        const utilisateur = await auth_repository_1.authRepository.trouverParEmail(donnees.email);
        if (!utilisateur) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.IDENTIFIANTS_INVALIDES, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE);
        }
        // Vérifier le mot de passe
        const motDePasseValide = await bcrypt_1.default.compare(donnees.motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.IDENTIFIANTS_INVALIDES, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE);
        }
        // Générer le token JWT
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({
            id: utilisateur.id,
            email: utilisateur.email,
            role: utilisateur.role,
        }, secret, { expiresIn: '7d' });
        return {
            token,
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                role: utilisateur.role,
            },
        };
    },
    /**
     * Récupère le profil de l'utilisateur connecté.
     * @param id - Identifiant de l'utilisateur
     */
    obtenirProfil: async (id) => {
        const utilisateur = await auth_repository_1.authRepository.trouverParId(id);
        if (!utilisateur) {
            throw new erreur_util_1.ErreurApplication(messages_1.MESSAGES.AUTH.TOKEN_INVALIDE, codes_http_1.CODES_HTTP.NON_AUTHENTIFIE);
        }
        return utilisateur;
    },
};
//# sourceMappingURL=auth.service.js.map