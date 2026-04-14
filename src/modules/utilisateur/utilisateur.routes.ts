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

export default router;