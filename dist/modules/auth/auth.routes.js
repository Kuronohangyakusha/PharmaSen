"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const auth_schema_1 = require("./auth.schema");
const router = (0, express_1.Router)();
/**
 * Routes d'authentification.
 * Préfixe : /api/auth
 */
// POST /api/auth/inscription
router.post('/inscription', (0, validation_middleware_1.valider)(auth_schema_1.inscriptionSchema), auth_controller_1.authController.inscrire);
// POST /api/auth/connexion
router.post('/connexion', (0, validation_middleware_1.valider)(auth_schema_1.connexionSchema), auth_controller_1.authController.connecter);
// GET /api/auth/profil (protégée)
router.get('/profil', auth_middleware_1.verifierAuth, auth_controller_1.authController.obtenirProfil);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map