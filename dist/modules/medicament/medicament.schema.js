"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierMedicamentSchema = exports.creerMedicamentSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour la création d'un médicament.
 */
exports.creerMedicamentSchema = zod_1.z.object({
    nomCommercial: zod_1.z.string().min(2, 'Le nom commercial est requis'),
    nomGenerique: zod_1.z.string().min(2, 'Le nom générique est requis'),
    description: zod_1.z.string().optional(),
    categorie: zod_1.z.string().min(2, 'La catégorie est requise'),
});
/**
 * Schéma de validation pour la modification d'un médicament.
 */
exports.modifierMedicamentSchema = zod_1.z.object({
    nomCommercial: zod_1.z.string().min(2).optional(),
    nomGenerique: zod_1.z.string().min(2).optional(),
    description: zod_1.z.string().optional(),
    categorie: zod_1.z.string().min(2).optional(),
});
//# sourceMappingURL=medicament.schema.js.map