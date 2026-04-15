import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import prisma from '../config/prisma';

let io: SocketIOServer | null = null;

/**
 * Initialise le serveur Socket.io
 * @param httpServer - Serveur HTTP existant
 */
export function initialiserSocketIO(httpServer: HTTPServer): SocketIOServer {
  const corsOrigin = process.env.CORS_ORIGINE_AUTORISEE || '*';
  
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ Client Socket.io connecté:', socket.id);

    // Rejoindre la salle admin
    socket.on('join:admin', () => {
      socket.join('admin');
      console.log('🔔 Admin connecté aux notifications');
    });

    // Rejoindre la salle pharmacien
    socket.on('join:pharmacien', (pharmacienId: string) => {
      socket.join(`pharmacien:${pharmacienId}`);
      console.log(`💊 Pharmacien ${pharmacienId} connecté`);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client déconnecté:', socket.id);
    });
  });

  return io;
}

/**
 * Émet une notification à l'admin
 * @param type - Type de notification
 * @param message - Message de la notification
 * @param data - Données supplémentaires
 */
export async function notifierAdmin(type: string, message: string, data?: any): Promise<void> {
  const notificationData = {
    type,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  // Émettre via Socket.io si connecté
  if (io) {
    io.to('admin').emit('notification', notificationData);
  }

  // Sauvegarder en base pour fallback polling - trouver l'admin réel
  try {
    const admin = await prisma.utilisateur.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true },
    });

    if (admin) {
      await prisma.notification.create({
        data: {
          type,
          message,
          data,
          destinataireId: admin.id,
          estLue: false,
        },
      });
    }
  } catch (error) {
    console.error('❌ Erreur sauvegarde notification:', error);
  }
}

/**
 * Émet une notification à un pharmacien spécifique
 * @param pharmacienId - ID du pharmacien
 * @param type - Type de notification
 * @param message - Message de la notification
 * @param data - Données supplémentaires
 */
export async function notifierPharmacien(pharmacienId: string, type: string, message: string, data?: any): Promise<void> {
  const notificationData = {
    type,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  // Émettre via Socket.io si connecté
  if (io) {
    io.to(`pharmacien:${pharmacienId}`).emit('notification', notificationData);
  }

  // Sauvegarder en base pour fallback polling
  try {
    await prisma.notification.create({
      data: {
        type,
        message,
        data,
        destinataireId: pharmacienId,
        estLue: false,
      },
    });
  } catch (error) {
    console.error('❌ Erreur sauvegarde notification:', error);
  }
}

/**
 * Retourne l'instance Socket.io
 */
export function getIO(): SocketIOServer | null {
  return io;
}
