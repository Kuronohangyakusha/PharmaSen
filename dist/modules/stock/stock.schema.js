"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierStockSchema = exports.creerStockSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour l'ajout d'un médicament au stock.
 */
exports.creerStockSchema = zod_1.z.object({
    medicamentId: zod_1.z.string().uuid('ID médicament invalide'),
    quantite: zod_1.z.number().int().min(0, 'La quantité ne peut pas être négative'),
    prix: zod_1.z.number().min(0, 'Le prix ne peut pas être négatif'),
    estDisponible: zod_1.z.boolean().default(true),
});
/**
 * Schéma de validation pour la modification d'un stock.
 */
exports.modifierStockSchema = zod_1.z.object({
    quantite: zod_1.z.number().int().min(0).optional(),
    prix: zod_1.z.number().min(0).optional(),
    estDisponible: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=stock.schema.js.map