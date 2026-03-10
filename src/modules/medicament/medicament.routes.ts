import { Router } from 'express';
import { medicamentController } from './medicament.controller';
import { valider } from '../../middlewares/validation.middleware';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { verifierRole } from '../../middlewares/role.middleware';
import { creerMedicamentSchema, modifierMedicamentSchema } from './medicament.schema';

const router = Router();

/**
 * Routes médicaments.
 * Préfixe : /api/medicaments
 */

// Routes publiques
router.get('/', medicamentController.obtenirTous);
router.get('/recherche', medicamentController.rechercher);
router.get('/:id', medicamentController.obtenirParId);

// Routes protégées (Admin uniquement)
router.post('/', verifierAuth, verifierRole('ADMIN'), valider(creerMedicamentSchema), medicamentController.creer);
router.put('/:id', verifierAuth, verifierRole('ADMIN'), valider(modifierMedicamentSchema), medicamentController.modifier);
router.delete('/:id', verifierAuth, verifierRole('ADMIN'), medicamentController.supprimer);

export default router;