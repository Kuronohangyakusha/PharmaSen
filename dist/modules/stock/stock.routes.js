"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_controller_1 = require("./stock.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const stock_schema_1 = require("./stock.schema");
const router = (0, express_1.Router)();
/**
 * Routes stocks.
 * Préfixe : /api/stocks
 */
// Routes publiques
router.get('/pharmacie/:pharmacieId', stock_controller_1.stockController.obtenirParPharmacie);
router.get('/comparateur', stock_controller_1.stockController.comparerPrix);
// Routes protégées (Pharmacien uniquement)
router.post('/', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), (0, validation_middleware_1.valider)(stock_schema_1.creerStockSchema), stock_controller_1.stockController.creer);
router.put('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), (0, validation_middleware_1.valider)(stock_schema_1.modifierStockSchema), stock_controller_1.stockController.modifier);
router.delete('/:id', auth_middleware_1.verifierAuth, (0, role_middleware_1.verifierRole)('PHARMACIEN'), stock_controller_1.stockController.supprimer);
exports.default = router;
//# sourceMappingURL=stock.routes.js.map