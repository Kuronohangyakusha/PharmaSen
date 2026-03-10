"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const garde_controller_1 = require("./garde.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const garde_schema_1 = require("./garde.schema");
const router = (0, express_1.Router)();
/**
 * Routes gardes.
 * Préfixe : /api/gardes
 */
// Routes publiques
router.get('/aujourd-hui', garde_controller_1.gardeController.obtenirAujourdhui);
router.get('/cette-semaine', garde_controller_1.gardeController.obtenirCetteSemaine);
// Routes protégées (Pharmacien uniquement)
router.post('/', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), (0, validation_middleware_1.valider)(garde_schema_1.creerGardeSchema), garde_controller_1.gardeController.creer);
router.put('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), (0, validation_middleware_1.valider)(garde_schema_1.modifierGardeSchema), garde_controller_1.gardeController.modifier);
router.delete('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), garde_controller_1.gardeController.supprimer);
exports.default = router;
//# sourceMappingURL=garde.routes.js.map