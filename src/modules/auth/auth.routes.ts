import { Router } from 'express';
import { authController } from './auth.controller';
import { valider } from '../../middlewares/validation.middleware';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { inscriptionSchema, connexionSchema } from './auth.schema';

const router = Router();

/**
 * Routes d'authentification.
 * Préfixe : /api/auth
 */

// POST /api/auth/inscription
router.post('/inscription', valider(inscriptionSchema), authController.inscrire);

// POST /api/auth/connexion
router.post('/connexion', valider(connexionSchema), authController.connecter);

// GET /api/auth/profil (protégée)
router.get('/profil', verifierAuth, authController.obtenirProfil);

// PUT /api/auth/profil (protégée)
router.put('/profil', verifierAuth, authController.modifierProfil);

export default router;