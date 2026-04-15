import { Router } from 'express';
import { utilisateurController } from './utilisateur.controller';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { verifierRole } from '../../middlewares/role.middleware';

const router = Router();

/**
 * Routes utilisateurs.
 * Préfixe : /api/utilisateurs
 */

// Routes protégées - Admin uniquement
router.get('/', verifierAuth, verifierRole('ADMIN'), utilisateurController.obtenirTous);
router.patch('/:id/statut', verifierAuth, verifierRole('ADMIN'), utilisateurController.modifierStatut);
router.delete('/:id', verifierAuth, verifierRole('ADMIN'), utilisateurController.supprimer);

// Routes pour les notifications (fallback polling)
router.get('/notifications', verifierAuth, utilisateurController.obtenirNotifications);
router.patch('/notifications/:id/lu', verifierAuth, utilisateurController.marquerNotificationLue);
router.patch('/notifications/lu', verifierAuth, utilisateurController.toutMarquerLu);

export default router;