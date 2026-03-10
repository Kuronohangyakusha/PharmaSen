"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pharmacie_controller_1 = require("./pharmacie.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const pharmacie_schema_1 = require("./pharmacie.schema");
const router = (0, express_1.Router)();
/**
 * Routes pharmacies.
 * Préfixe : /api/pharmacies
 */
// Routes publiques
router.get('/', pharmacie_controller_1.pharmacieController.obtenirToutes);
router.get('/recherche', pharmacie_controller_1.pharmacieController.rechercher);
router.get('/garde', pharmacie_controller_1.pharmacieController.obtenirDeGarde);
router.get('/:id', pharmacie_controller_1.pharmacieController.obtenirParId);
// Routes protégées
router.post('/', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), (0, validation_middleware_1.valider)(pharmacie_schema_1.creerPharmacieSchema), pharmacie_controller_1.pharmacieController.creer);
router.put('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN', 'ADMIN'), (0, validation_middleware_1.valider)(pharmacie_schema_1.modifierPharmacieSchema), pharmacie_controller_1.pharmacieController.modifier);
router.patch('/:id/valider', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('ADMIN'), pharmacie_controller_1.pharmacieController.valider);
router.delete('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('ADMIN'), pharmacie_controller_1.pharmacieController.supprimer);
exports.default = router;
//# sourceMappingURL=pharmacie.routes.js.map