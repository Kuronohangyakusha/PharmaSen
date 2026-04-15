import { utilisateurRepository } from './utilisateur.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import prisma from '../../config/prisma';

export const utilisateurService = {

  obtenirTous: async () => {
    return utilisateurRepository.trouverTous();
  },

  modifierStatut: async (id: string, estActif: boolean) => {
    const utilisateur = await utilisateurRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(MESSAGES.UTILISATEUR.INTROUVABLE, CODES_HTTP.INTROUVABLE);
    }
    return utilisateurRepository.modifier(id, { estActif });
  },

  supprimer: async (id: string) => {
    const utilisateur = await utilisateurRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(MESSAGES.UTILISATEUR.INTROUVABLE, CODES_HTTP.INTROUVABLE);
    }
    return utilisateurRepository.supprimer(id);
  },

  obtenirNotifications: async (utilisateurId: string) => {
    return prisma.notification.findMany({
      where: { destinataireId: utilisateurId },
      orderBy: { dateCreation: 'desc' },
      take: 50,
    });
  },

  marquerNotificationLue: async (notificationId: string, utilisateurId: string) => {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, destinataireId: utilisateurId },
    });
    if (!notification) {
      throw new ErreurApplication('Notification introuvable', CODES_HTTP.INTROUVABLE);
    }
    return prisma.notification.update({
      where: { id: notificationId },
      data: { estLue: true },
    });
  },

  toutMarquerLu: async (utilisateurId: string) => {
    return prisma.notification.updateMany({
      where: { destinataireId: utilisateurId, estLue: false },
      data: { estLue: true },
    });
  },
};