import prisma from '../../config/prisma';
import { CreerPharmacieDto, ModifierPharmacieDto } from './pharmacie.schema';

/**
 * Repository des pharmacies.
 * Contient uniquement les requêtes Prisma.
 */
export const pharmacieRepository = {

  /**
   * Retourne toutes les pharmacies validées et ouvertes.
   */
  trouverToutes: () => {
    return prisma.pharmacie.findMany({
      where: { estValidee: true, estOuverte: true },
      orderBy: { nom: 'asc' },
    });
  },

  /**
   * Trouve une pharmacie par son id avec ses stocks.
   * @param id - Identifiant de la pharmacie
   */
  trouverParId: (id: string) => {
    return prisma.pharmacie.findUnique({
      where: { id },
      include: {
        stocks: {
          include: { medicament: true },
        },
      },
    });
  },

  /**
   * Recherche les pharmacies ouvertes ayant un médicament disponible.
   * @param nomMedicament - Nom du médicament recherché
   */
  rechercherParMedicament: (nomMedicament: string) => {
    return prisma.pharmacie.findMany({
      where: {
        estValidee: true,
        estOuverte: true,
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
   * Retourne les pharmacies de garde en ce moment.
   */
  trouverDeGarde: () => {
    const maintenant = new Date();
    return prisma.pharmacie.findMany({
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
  creer: (donnees: CreerPharmacieDto, proprietaireId: string) => {
    return prisma.pharmacie.create({
      data: { ...donnees, proprietaireId },
    });
  },

  /**
   * Modifie une pharmacie existante.
   * @param id - Identifiant de la pharmacie
   * @param donnees - Données à modifier
   */
  modifier: (id: string, donnees: ModifierPharmacieDto) => {
    return prisma.pharmacie.update({ where: { id }, data: donnees });
  },

  /**
   * Valide une pharmacie (réservé à l'admin).
   * @param id - Identifiant de la pharmacie
   */
  valider: (id: string) => {
    return prisma.pharmacie.update({
      where: { id },
      data: { estValidee: true },
    });
  },

  /**
   * Supprime une pharmacie.
   * @param id - Identifiant de la pharmacie
   */
  supprimer: (id: string) => {
    return prisma.pharmacie.delete({ where: { id } });
  },

  /**
   * Trouve la pharmacie d'un propriétaire.
   * @param proprietaireId - Identifiant du propriétaire
   */
  trouverParProprietaire: (proprietaireId: string) => {
    return prisma.pharmacie.findUnique({
      where: { proprietaireId },
    });
  },

  /**
   * Change le statut d'ouverture d'une pharmacie.
   * @param id - Identifiant de la pharmacie
   * @param estOuverte - Nouveau statut
   */
  changerStatut: (id: string, estOuverte: boolean) => {
    return prisma.pharmacie.update({
      where: { id },
      data: { estOuverte },
    });
  },

  /**
   * Vérifie si une pharmacie a une garde active en ce moment.
   * @param id - Identifiant de la pharmacie
   */
  aGardeActive: (id: string) => {
    const maintenant = new Date();
    return prisma.garde.findFirst({
      where: {
        pharmacieId: id,
        dateDebut: { lte: maintenant },
        dateFin: { gte: maintenant },
      },
    });
  },
};