"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
/**
 * Repository d'authentification.
 * Contient uniquement les requêtes Prisma liées aux utilisateurs.
 */
exports.authRepository = {
    /**
     * Trouve un utilisateur par son email.
     * @param email - Email de l'utilisateur
     */
    trouverParEmail: (email) => {
        return prisma_1.default.utilisateur.findUnique({
            where: { email },
        });
    },
    /**
     * Crée un nouvel utilisateur en base de données.
     * @param donnees - Données de l'utilisateur à créer
     */
    creerUtilisateur: (donnees) => {
        return prisma_1.default.utilisateur.create({
            data: donnees,
            select: {
                id: true,
                nom: true,
                email: true,
                role: true,
                dateCreation: true,
            },
        });
    },
    /**
     * Trouve un utilisateur par son id.
     * @param id - Identifiant de l'utilisateur
     */
    trouverParId: (id) => {
        return prisma_1.default.utilisateur.findUnique({
            where: { id },
            select: {
                id: true,
                nom: true,
                email: true,
                role: true,
                estActif: true,
                dateCreation: true,
            },
        });
    },
};
//# sourceMappingURL=auth.repository.js.map