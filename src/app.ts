import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import prisma from './config/prisma';
import { gererErreurs } from './middlewares/erreur.middleware';
import { initialiserSocketIO } from './services/socket.service';
import authRoutes from './modules/auth/auth.routes';
import medicamentRoutes from './modules/medicament/medicament.routes';
import pharmacieRoutes from './modules/pharmacie/pharmacie.routes';
import stockRoutes from './modules/stock/stock.routes';
import gardeRoutes from './modules/garde/garde.routes';
import utilisateurRoutes from './modules/utilisateur/utilisateur.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGINE_AUTORISEE }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicaments', medicamentRoutes);
app.use('/api/pharmacies', pharmacieRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/gardes', gardeRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: '💊 pharmaSen API is running !' });
});

// Middleware de gestion des erreurs (toujours en dernier)
app.use(gererErreurs);

async function demarrerServeur(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Connexion base de données : OK');
    
    // Créer le serveur HTTP et initialiser Socket.io
    const httpServer = createServer(app);
    initialiserSocketIO(httpServer);
    
    httpServer.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🔌 Socket.io enabled`);
    });
  } catch (erreur) {
    console.error('❌ Erreur connexion base de données :', erreur);
    process.exit(1);
  }
}

demarrerServeur();

export default app;