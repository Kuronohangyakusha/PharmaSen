import prisma from '../../config/prisma';
import { CreerMedicamentDto, ModifierMedicamentDto } from './medicament.schema';

/**
 * Repository des médicaments.
 * Contient uniquement les requêtes Prisma.
 */
export const medicamentRepository = {

  /**
   * Retourne tous les médicaments.
   */
  trouverTous: () => {
    return prisma.medicament.findMany({
      orderBy: { nomCommercial: 'asc' },
    });
  },

  /**
   * Trouve un médicament par son id.
   * @param id - Identifiant du médicament
   */
  trouverParId: (id: string) => {
    return prisma.medicament.findUnique({
      where: { id },
    });
  },

  /**
   * Recherche des médicaments par nom commercial ou générique.
   * La recherche est insensible à la casse.
   * @param terme - Terme de recherche
   */
  rechercherParNom: (terme: string) => {
    const termeNormalise = terme.trim().toLowerCase();
    return prisma.medicament.findMany({
      where: {
        OR: [
          { nomCommercial: { contains: termeNormalise, mode: 'insensitive' } },
          { nomGenerique: { contains: termeNormalise, mode: 'insensitive' } },
        ],
      },
      orderBy: { nomCommercial: 'asc' },
    });
  },

  /**
   * Crée un nouveau médicament.
   * @param donnees - Données du médicament
   */
  creer: (donnees: CreerMedicamentDto) => {
    return prisma.medicament.create({ data: donnees });
  },

  /**
   * Modifie un médicament existant.
   * @param id - Identifiant du médicament
   * @param donnees - Données à modifier
   */
  modifier: (id: string, donnees: ModifierMedicamentDto) => {
    return prisma.medicament.update({ where: { id }, data: donnees });
  },

  /**
   * Supprime un médicament.
   * @param id - Identifiant du médicament
   */
  supprimer: (id: string) => {
    return prisma.medicament.delete({ where: { id } });
  },
};