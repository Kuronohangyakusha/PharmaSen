import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

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
export function notifierAdmin(type: string, message: string, data?: any): void {
  if (io) {
    io.to('admin').emit('notification', {
      type,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Émet une notification à un pharmacien spécifique
 * @param pharmacienId - ID du pharmacien
 * @param type - Type de notification
 * @param message - Message de la notification
 * @param data - Données supplémentaires
 */
export function notifierPharmacien(pharmacienId: string, type: string, message: string, data?: any): void {
  if (io) {
    io.to(`pharmacien:${pharmacienId}`).emit('notification', {
      type,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Retourne l'instance Socket.io
 */
export function getIO(): SocketIOServer | null {
  return io;
}
