import { Router } from 'express';
import { gardeController } from './garde.controller';
import { valider } from '../../middlewares/validation.middleware';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { verifierRole } from '../../middlewares/role.middleware';
import { creerGardeSchema, modifierGardeSchema } from './garde.schema';

const router = Router();

/**
 * Routes gardes.
 * Préfixe : /api/gardes
 */

// Routes publiques
router.get('/aujourd-hui', gardeController.obtenirAujourdhui);
router.get('/cette-semaine', gardeController.obtenirCetteSemaine);

// Routes protégées (Admin et Pharmacien)
router.post('/', verifierAuth, verifierRole('ADMIN', 'PHARMACIEN'), valider(creerGardeSchema), gardeController.creer);
router.put('/:id', verifierAuth, verifierRole('ADMIN', 'PHARMACIEN'), valider(modifierGardeSchema), gardeController.modifier);
router.delete('/:id', verifierAuth, verifierRole('ADMIN', 'PHARMACIEN'), gardeController.supprimer);

export default router;