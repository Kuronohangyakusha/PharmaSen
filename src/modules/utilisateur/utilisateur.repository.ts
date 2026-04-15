import prisma from '../../config/prisma';

export const utilisateurRepository = {

  trouverTous: () => {
    return prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
        estActif: true,
        dateCreation: true,
      },
      orderBy: { dateCreation: 'desc' },
    });
  },

  trouverParId: (id: string) => {
    return prisma.utilisateur.findUnique({ where: { id } });
  },

  modifier: (id: string, data: { estActif?: boolean }) => {
    return prisma.utilisateur.update({ where: { id }, data });
  },

  supprimer: (id: string) => {
    return prisma.utilisateur.delete({ where: { id } });
  },
};