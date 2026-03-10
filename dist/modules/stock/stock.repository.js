"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
/**
 * Repository des stocks.
 * Contient uniquement les requêtes Prisma.
 */
exports.stockRepository = {
    /**
     * Retourne tous les stocks d'une pharmacie.
     * @param pharmacieId - Identifiant de la pharmacie
     */
    trouverParPharmacie: (pharmacieId) => {
        return prisma_1.default.stock.findMany({
            where: { pharmacieId },
            include: { medicament: true },
            orderBy: { medicament: { nomCommercial: 'asc' } },
        });
    },
    /**
     * Trouve un stock par son id.
     * @param id - Identifiant du stock
     */
    trouverParId: (id) => {
        return prisma_1.default.stock.findUnique({
            where: { id },
            include: { medicament: true, pharmacie: true },
        });
    },
    /**
     * Trouve un stock par pharmacie et médicament.
     * @param pharmacieId - Identifiant de la pharmacie
     * @param medicamentId - Identifiant du médicament
     */
    trouverParPharmacieEtMedicament: (pharmacieId, medicamentId) => {
        return prisma_1.default.stock.findUnique({
            where: {
                pharmacieId_medicamentId: { pharmacieId, medicamentId },
            },
        });
    },
    /**
     * Compare les prix d'un médicament entre toutes les pharmacies.
     * @param medicamentId - Identifiant du médicament
     */
    comparerPrix: (medicamentId) => {
        return prisma_1.default.stock.findMany({
            where: {
                medicamentId,
                estDisponible: true,
                pharmacie: { estValidee: true },
            },
            include: {
                pharmacie: true,
                medicament: true,
            },
            orderBy: { prix: 'asc' },
        });
    },
    /**
     * Crée un nouveau stock.
     * @param donnees - Données du stock
     * @param pharmacieId - Identifiant de la pharmacie
     */
    creer: (donnees, pharmacieId) => {
        return prisma_1.default.stock.create({
            data: { ...donnees, pharmacieId },
            include: { medicament: true },
        });
    },
    /**
     * Modifie un stock existant.
     * @param id - Identifiant du stock
     * @param donnees - Données à modifier
     */
    modifier: (id, donnees) => {
        return prisma_1.default.stock.update({
            where: { id },
            data: donnees,
            include: { medicament: true },
        });
    },
    /**
     * Supprime un stock.
     * @param id - Identifiant du stock
     */
    supprimer: (id) => {
        return prisma_1.default.stock.delete({ where: { id } });
    },
};
//# sourceMappingURL=stock.repository.js.map