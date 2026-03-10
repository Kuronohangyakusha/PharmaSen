"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pharmacieRepository = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
/**
 * Repository des pharmacies.
 * Contient uniquement les requêtes Prisma.
 */
exports.pharmacieRepository = {
    /**
     * Retourne toutes les pharmacies validées.
     */
    trouverToutes: () => {
        return prisma_1.default.pharmacie.findMany({
            where: { estValidee: true },
            orderBy: { nom: 'asc' },
        });
    },
    /**
     * Trouve une pharmacie par son id avec ses stocks.
     * @param id - Identifiant de la pharmacie
     */
    trouverParId: (id) => {
        return prisma_1.default.pharmacie.findUnique({
            where: { id },
            include: {
                stocks: {
                    include: { medicament: true },
                },
            },
        });
    },
    /**
     * Recherche les pharmacies ayant un médicament disponible.
     * @param nomMedicament - Nom du médicament recherché
     */
    rechercherParMedicament: (nomMedicament) => {
        return prisma_1.default.pharmacie.findMany({
            where: {
                estValidee: true,
                stocks: {
                    some: {
                        estDisponible: true,
                        medicament: {
                            OR: [
                                { nomCommercial: { contains: nomMedicament, mode: 'insensitive' } },
                                { nomGenerique: { contains: nomMedicament, mode: 'insensitive' } },
                            ],
                        },
                    },
                },
            },
            include: {
                stocks: {
                    where: {
                        estDisponible: true,
                        medicament: {
                            OR: [
                                { nomCommercial: { contains: nomMedicament, mode: 'insensitive' } },
                                { nomGenerique: { contains: nomMedicament, mode: 'insensitive' } },
                            ],
                        },
                    },
                    include: { medicament: true },
                },
            },
        });
    },
    /**
     * Retourne les pharmacies de garde aujourd'hui.
     */
    trouverDeGarde: () => {
        const maintenant = new Date();
        return prisma_1.default.pharmacie.findMany({
            where: {
                estValidee: true,
                gardes: {
                    some: {
                        dateDebut: { lte: maintenant },
                        dateFin: { gte: maintenant },
                    },
                },
            },
            include: {
                gardes: {
                    where: {
                        dateDebut: { lte: maintenant },
                        dateFin: { gte: maintenant },
                    },
                },
            },
        });
    },
    /**
     * Crée une nouvelle pharmacie.
     * @param donnees - Données de la pharmacie
     * @param proprietaireId - Id du pharmacien propriétaire
     */
    creer: (donnees, proprietaireId) => {
        return prisma_1.default.pharmacie.create({
            data: { ...donnees, proprietaireId },
        });
    },
    /**
     * Modifie une pharmacie existante.
     * @param id - Identifiant de la pharmacie
     * @param donnees - Données à modifier
     */
    modifier: (id, donnees) => {
        return prisma_1.default.pharmacie.update({ where: { id }, data: donnees });
    },
    /**
     * Valide une pharmacie (réservé à l'admin).
     * @param id - Identifiant de la pharmacie
     */
    valider: (id) => {
        return prisma_1.default.pharmacie.update({
            where: { id },
            data: { estValidee: true },
        });
    },
    /**
     * Supprime une pharmacie.
     * @param id - Identifiant de la pharmacie
     */
    supprimer: (id) => {
        return prisma_1.default.pharmacie.delete({ where: { id } });
    },
    /**
     * Trouve la pharmacie d'un propriétaire.
     * @param proprietaireId - Identifiant du propriétaire
     */
    trouverParProprietaire: (proprietaireId) => {
        return prisma_1.default.pharmacie.findUnique({
            where: { proprietaireId },
        });
    }
};
//# sourceMappingURL=pharmacie.repository.js.map