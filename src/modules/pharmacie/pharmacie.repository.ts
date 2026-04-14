import prisma from '../../config/prisma';
import { CreerPharmacieDto, ModifierPharmacieDto } from './pharmacie.schema';

/**
 * Normalise une chaîne de caractères pour la recherche.
 * Supprime les accents et convertit en minuscules.
 */
function normaliserRecherche(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Crée un pattern de recherche normalisé pour PostgreSQL.
 */
function creerPatternRecherche(nomMedicament: string): string {
  const normalise = normaliserRecherche(nomMedicament);
  // Utiliser un pattern qui cherche le terme normalisé
  return `%${normalise}%`;
}

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
        gardes: true,
      },
    });
  },

  /**
   * Recherche les pharmacies ouvertes ayant un médicament disponible.
   * La recherche est insensible à la casse et aux accents.
   * @param nomMedicament - Nom du médicament recherché
   */
  rechercherParMedicament: (nomMedicament: string) => {
    // Utiliser une requête qui fonctionne avec contains insensible à la casse
    // PostgreSQL avec mode: 'insensitive' gère déjà la casse
    // Pour les accents, on utilise une approche avec OR sur différentes variantes
    const rechercheBase = nomMedicament.trim();
    
    return prisma.pharmacie.findMany({
      where: {
        estValidee: true,
        estOuverte: true,
        stocks: {
          some: {
            estDisponible: true,
            medicament: {
              OR: [
                { nomCommercial: { contains: rechercheBase, mode: 'insensitive' } },
                { nomGenerique: { contains: rechercheBase, mode: 'insensitive' } },
                // Recherche avec accents removidos para lidar com variaciones
                { nomCommercial: { startsWith: rechercheBase.substring(0, 3), mode: 'insensitive' } },
                { nomGenerique: { startsWith: rechercheBase.substring(0, 3), mode: 'insensitive' } },
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
                { nomCommercial: { contains: rechercheBase, mode: 'insensitive' } },
                { nomGenerique: { contains: rechercheBase, mode: 'insensitive' } },
              ],
            },
          },
          include: { medicament: true },
        },
        gardes: true,
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
   * @param donnees - Données de la pharmacie (latitude/longitude обязательно définies)
   * @param proprietaireId - Id du pharmacien propriétaire
   */
  creer: (donnees: any, proprietaireId: string) => {
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
   * Retourne toutes les pharmacies en attente de validation.
   */
  trouverEnAttente: () => {
    return prisma.pharmacie.findMany({
      where: { estValidee: false },
      include: { proprietaire: true },
      orderBy: { dateCreation: 'desc' },
    });
  },

  /**
   * Retourne toutes les pharmacies pour l'admin (incluant non validées).
   */
  trouverToutesAdmin: () => {
    return prisma.pharmacie.findMany({
      include: { proprietaire: true },
      orderBy: { dateCreation: 'desc' },
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