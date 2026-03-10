import prisma from '../../config/prisma';
import { CreerGardeDto, ModifierGardeDto } from './garde.schema';

/**
 * Repository des gardes.
 * Contient uniquement les requêtes Prisma.
 */
export const gardeRepository = {

  /**
   * Retourne les gardes actives aujourd'hui.
   */
  trouverAujourdhui: () => {
    const maintenant = new Date();
    return prisma.garde.findMany({
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

    return prisma.garde.findMany({
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
  trouverParId: (id: string) => {
    return prisma.garde.findUnique({
      where: { id },
      include: { pharmacie: true },
    });
  },

  /**
   * Crée une nouvelle garde.
   * @param donnees - Données de la garde
   * @param pharmacieId - Identifiant de la pharmacie
   */
  creer: (donnees: CreerGardeDto, pharmacieId: string) => {
    return prisma.garde.create({
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
  modifier: (id: string, donnees: ModifierGardeDto) => {
    return prisma.garde.update({
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
  supprimer: (id: string) => {
    return prisma.garde.delete({ where: { id } });
  },
};