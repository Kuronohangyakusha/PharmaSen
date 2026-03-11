import { Router } from 'express';
import { pharmacieController } from './pharmacie.controller';
import { valider } from '../../middlewares/validation.middleware';
import { verifierAuth } from '../../middlewares/auth.middleware';
import { verifierRole } from '../../middlewares/role.middleware';
import { creerPharmacieSchema, modifierPharmacieSchema, changerStatutSchema } from './pharmacie.schema';

 
const router = Router();

/**
 * Routes pharmacies.
 * Préfixe : /api/pharmacies
 */

// Routes publiques
router.get('/', pharmacieController.obtenirToutes);
router.get('/recherche', pharmacieController.rechercher);
router.get('/garde', pharmacieController.obtenirDeGarde);
router.get('/:id', pharmacieController.obtenirParId);

// Routes protégées
router.post('/', verifierAuth, verifierRole('PHARMACIEN'), valider(creerPharmacieSchema), pharmacieController.creer);
router.put('/:id', verifierAuth, verifierRole('PHARMACIEN', 'ADMIN'), valider(modifierPharmacieSchema), pharmacieController.modifier);
router.patch('/:id/valider', verifierAuth, verifierRole('ADMIN'), pharmacieController.valider);
router.patch('/:id/statut', verifierAuth, verifierRole('PHARMACIEN'), valider(changerStatutSchema), pharmacieController.changerStatut);
router.delete('/:id', verifierAuth, verifierRole('ADMIN'), pharmacieController.supprimer);

export default router;