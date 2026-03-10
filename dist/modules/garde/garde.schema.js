"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierGardeSchema = exports.creerGardeSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour la création d'une garde.
 */
exports.creerGardeSchema = zod_1.z.object({
    dateDebut: zod_1.z.string().datetime('Date de début invalide'),
    dateFin: zod_1.z.string().datetime('Date de fin invalide'),
    typeGarde: zod_1.z.enum(['JOUR', 'NUIT']).default('JOUR'),
});
/**
 * Schéma de validation pour la modification d'une garde.
 */
exports.modifierGardeSchema = zod_1.z.object({
    dateDebut: zod_1.z.string().datetime().optional(),
    dateFin: zod_1.z.string().datetime().optional(),
    typeGarde: zod_1.z.enum(['JOUR', 'NUIT']).optional(),
});
//# sourceMappingURL=garde.schema.js.map