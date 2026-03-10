import prisma from '../../config/prisma';
import { CreerStockDto, ModifierStockDto } from './stock.schema';

/**
 * Repository des stocks.
 * Contient uniquement les requêtes Prisma.
 */
export const stockRepository = {

  /**
   * Retourne tous les stocks d'une pharmacie.
   * @param pharmacieId - Identifiant de la pharmacie
   */
  trouverParPharmacie: (pharmacieId: string) => {
    return prisma.stock.findMany({
      where: { pharmacieId },
      include: { medicament: true },
      orderBy: { medicament: { nomCommercial: 'asc' } },
    });
  },

  /**
   * Trouve un stock par son id.
   * @param id - Identifiant du stock
   */
  trouverParId: (id: string) => {
    return prisma.stock.findUnique({
      where: { id },
      include: { medicament: true, pharmacie: true },
    });
  },

  /**
   * Trouve un stock par pharmacie et médicament.
   * @param pharmacieId - Identifiant de la pharmacie
   * @param medicamentId - Identifiant du médicament
   */
  trouverParPharmacieEtMedicament: (pharmacieId: string, medicamentId: string) => {
    return prisma.stock.findUnique({
      where: {
        pharmacieId_medicamentId: { pharmacieId, medicamentId },
      },
    });
  },

  /**
   * Compare les prix d'un médicament entre toutes les pharmacies.
   * @param medicamentId - Identifiant du médicament
   */
  comparerPrix: (medicamentId: string) => {
    return prisma.stock.findMany({
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
  creer: (donnees: CreerStockDto, pharmacieId: string) => {
    return prisma.stock.create({
      data: { ...donnees, pharmacieId },
      include: { medicament: true },
    });
  },

  /**
   * Modifie un stock existant.
   * @param id - Identifiant du stock
   * @param donnees - Données à modifier
   */
  modifier: (id: string, donnees: ModifierStockDto) => {
    return prisma.stock.update({
      where: { id },
      data: donnees,
      include: { medicament: true },
    });
  },

  /**
   * Supprime un stock.
   * @param id - Identifiant du stock
   */
  supprimer: (id: string) => {
    return prisma.stock.delete({ where: { id } });
  },
};