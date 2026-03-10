"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardeRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
/**
 * Repository des gardes.
 * Contient uniquement les requêtes Prisma.
 */
exports.gardeRepository = {
    /**
     * Retourne les gardes actives aujourd'hui.
     */
    trouverAujourdhui: () => {
        const maintenant = new Date();
        return prisma_1.default.garde.findMany({
            where: {
                dateDebut: { lte: maintenant },
                dateFin: { gte: maintenant },
            },
            include: { pharmacie: true },
            orderBy: { typeGarde: 'asc' },
        });
    },
    /**
     * Retourne les gardes de la semaine courante.
     */
    trouverCetteSemaine: () => {
        const maintenant = new Date();
        const finSemaine = new Date();
        finSemaine.setDate(maintenant.getDate() + 7);
        return prisma_1.default.garde.findMany({
            where: {
                dateDebut: { gte: maintenant },
                dateFin: { lte: finSemaine },
            },
            include: { pharmacie: true },
            orderBy: { dateDebut: 'asc' },
        });
    },
    /**
     * Trouve une garde par son id.
     * @param id - Identifiant de la garde
     */
    trouverParId: (id) => {
        return prisma_1.default.garde.findUnique({
            where: { id },
            include: { pharmacie: true },
        });
    },
    /**
     * Crée une nouvelle garde.
     * @param donnees - Données de la garde
     * @param pharmacieId - Identifiant de la pharmacie
     */
    creer: (donnees, pharmacieId) => {
        return prisma_1.default.garde.create({
            data: {
                dateDebut: new Date(donnees.dateDebut),
                dateFin: new Date(donnees.dateFin),
                typeGarde: donnees.typeGarde,
                pharmacieId,
            },
            include: { pharmacie: true },
        });
    },
    /**
     * Modifie une garde existante.
     * @param id - Identifiant de la garde
     * @param donnees - Données à modifier
     */
    modifier: (id, donnees) => {
        return prisma_1.default.garde.update({
            where: { id },
            data: {
                ...(donnees.dateDebut && { dateDebut: new Date(donnees.dateDebut) }),
                ...(donnees.dateFin && { dateFin: new Date(donnees.dateFin) }),
                ...(donnees.typeGarde && { typeGarde: donnees.typeGarde }),
            },
            include: { pharmacie: true },
        });
    },
    /**
     * Supprime une garde.
     * @param id - Identifiant de la garde
     */
    supprimer: (id) => {
        return prisma_1.default.garde.delete({ where: { id } });
    },
};
//# sourceMappingURL=garde.repository.js.map