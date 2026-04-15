import prisma from '../../config/prisma';

/**
 * Repository d'authentification.
 * Contient uniquement les requêtes Prisma liées aux utilisateurs.
 */
export const authRepository = {

  /**
   * Trouve un utilisateur par son email.
   * @param email - Email de l'utilisateur
   */
  trouverParEmail: (email: string) => {
    return prisma.utilisateur.findUnique({
      where: { email },
      select: {
        id: true,
        nom: true,
        email: true,
        motDePasse: true,
        role: true,
        estActif: true,
        dateCreation: true,
      },
    });
  },

  /**
   * Crée un nouvel utilisateur en base de données.
   * @param donnees - Données de l'utilisateur à créer
   */
  creerUtilisateur: (donnees: {
    nom: string;
    email: string;
    motDePasse: string;
    role?: 'VISITEUR' | 'PHARMACIEN' | 'ADMIN';
  }) => {
    return prisma.utilisateur.create({
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
  trouverParId: (id: string) => {
    return prisma.utilisateur.findUnique({
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

  /**
   * Modifie un utilisateur.
   * @param id - Identifiant de l'utilisateur
   * @param donnees - Données à modifier
   */
  modifierUtilisateur: (id: string, donnees: { nom?: string; email?: string }) => {
    return prisma.utilisateur.update({
      where: { id },
      data: donnees,
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