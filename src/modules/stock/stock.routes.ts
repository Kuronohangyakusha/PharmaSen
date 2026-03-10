import { Router } from 'express';
import { stockController } from './stock.controller';
import { valider } from '../../middlewares/validation.middleware';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { verifierRole } from '../../middlewares/role.middleware';
import { creerStockSchema, modifierStockSchema } from './stock.schema';

const router = Router();

/**
 * Routes stocks.
 * Préfixe : /api/stocks
 */

// Routes publiques
router.get('/pharmacie/:pharmacieId', stockController.obtenirParPharmacie);
router.get('/comparateur', stockController.comparerPrix);

// Routes protégées (Pharmacien uniquement)
router.post('/', verifierAuth, verifierRole('PHARMACIEN'), valider(creerStockSchema), stockController.creer);
router.put('/:id', verifierAuth, verifierRole('PHARMACIEN'), valider(modifierStockSchema), stockController.modifier);
router.delete('/:id', verifierAuth, verifierRole('PHARMACIEN'), stockController.supprimer);

export default router;