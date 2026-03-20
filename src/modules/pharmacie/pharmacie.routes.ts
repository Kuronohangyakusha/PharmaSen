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
router.get('/moi', verifierAuth, verifierRole('PHARMACIEN'), pharmacieController.obtenirMaPharmacie);

// Routes admin (doivent être AVANT /:id pour éviter que Express les interprète comme des IDs)
router.get('/en-attente', verifierAuth, verifierRole('ADMIN'), pharmacieController.obtenirEnAttente);
router.get('/toutes', verifierAuth, verifierRole('ADMIN'), pharmacieController.obtenirToutesAdmin);

// Route par ID (doit être après les routes spécifiques)
router.get('/:id', pharmacieController.obtenirParId);

// Routes protégées
router.post('/', verifierAuth, verifierRole('PHARMACIEN'), valider(creerPharmacieSchema), pharmacieController.creer);
router.put('/:id', verifierAuth, verifierRole('PHARMACIEN', 'ADMIN'), valider(modifierPharmacieSchema), pharmacieController.modifier);
router.patch('/:id/valider', verifierAuth, verifierRole('ADMIN'), pharmacieController.valider);
router.patch('/:id/rejeter', verifierAuth, verifierRole('ADMIN'), pharmacieController.rejeter);
router.patch('/:id/statut', verifierAuth, verifierRole('PHARMACIEN'), valider(changerStatutSchema), pharmacieController.changerStatut);
router.delete('/:id', verifierAuth, verifierRole('ADMIN'), pharmacieController.supprimer);

// Routes admin (déplacées plus haut pour éviter les conflits avec /:id)

export default router;