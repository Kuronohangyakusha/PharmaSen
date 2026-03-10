"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicamentRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
/**
 * Repository des médicaments.
 * Contient uniquement les requêtes Prisma.
 */
exports.medicamentRepository = {
    /**
     * Retourne tous les médicaments.
     */
    trouverTous: () => {
        return prisma_1.default.medicament.findMany({
            orderBy: { nomCommercial: 'asc' },
        });
    },
    /**
     * Trouve un médicament par son id.
     * @param id - Identifiant du médicament
     */
    trouverParId: (id) => {
        return prisma_1.default.medicament.findUnique({
            where: { id },
        });
    },
    /**
     * Recherche des médicaments par nom commercial ou générique.
     * @param terme - Terme de recherche
     */
    rechercherParNom: (terme) => {
        return prisma_1.default.medicament.findMany({
            where: {
                OR: [
                    { nomCommercial: { contains: terme, mode: 'insensitive' } },
                    { nomGenerique: { contains: terme, mode: 'insensitive' } },
                ],
            },
            orderBy: { nomCommercial: 'asc' },
        });
    },
    /**
     * Crée un nouveau médicament.
     * @param donnees - Données du médicament
     */
    creer: (donnees) => {
        return prisma_1.default.medicament.create({ data: donnees });
    },
    /**
     * Modifie un médicament existant.
     * @param id - Identifiant du médicament
     * @param donnees - Données à modifier
     */
    modifier: (id, donnees) => {
        return prisma_1.default.medicament.update({ where: { id }, data: donnees });
    },
    /**
     * Supprime un médicament.
     * @param id - Identifiant du médicament
     */
    supprimer: (id) => {
        return prisma_1.default.medicament.delete({ where: { id } });
    },
};
//# sourceMappingURL=medicament.repository.js.map