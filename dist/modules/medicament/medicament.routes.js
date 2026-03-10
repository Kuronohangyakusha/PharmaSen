"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicament_controller_1 = require("./medicament.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const medicament_schema_1 = require("./medicament.schema");
const router = (0, express_1.Router)();
/**
 * Routes médicaments.
 * Préfixe : /api/medicaments
 */
// Routes publiques
router.get('/', medicament_controller_1.medicamentController.obtenirTous);
router.get('/recherche', medicament_controller_1.medicamentController.rechercher);
router.get('/:id', medicament_controller_1.medicamentController.obtenirParId);
// Routes protégées (Admin uniquement)
router.post('/', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('ADMIN'), (0, validation_middleware_1.valider)(medicament_schema_1.creerMedicamentSchema), medicament_controller_1.medicamentController.creer);
router.put('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('ADMIN'), (0, validation_middleware_1.valider)(medicament_schema_1.modifierMedicamentSchema), medicament_controller_1.medicamentController.modifier);
router.delete('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('ADMIN'), medicament_controller_1.medicamentController.supprimer);
exports.default = router;
//# sourceMappingURL=medicament.routes.js.map