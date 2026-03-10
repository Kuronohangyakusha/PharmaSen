"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierPharmacieSchema = exports.creerPharmacieSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour la création d'une pharmacie.
 */
exports.creerPharmacieSchema = zod_1.z.object({
    nom: zod_1.z.string().min(2, 'Le nom est requis'),
    adresse: zod_1.z.string().min(5, 'L\'adresse est requise'),
    quartier: zod_1.z.string().min(2, 'Le quartier est requis'),
    telephone: zod_1.z.string().min(9, 'Le téléphone est requis'),
    latitude: zod_1.z.number({ message: 'La latitude est requise' }),
    longitude: zod_1.z.number({ message: 'La longitude est requise' }),
    horaires: zod_1.z.string().min(2, 'Les horaires sont requis'),
});
/**
 * Schéma de validation pour la modification d'une pharmacie.
 */
exports.modifierPharmacieSchema = zod_1.z.object({
    nom: zod_1.z.string().min(2).optional(),
    adresse: zod_1.z.string().min(5).optional(),
    quartier: zod_1.z.string().min(2).optional(),
    telephone: zod_1.z.string().min(9).optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    horaires: zod_1.z.string().min(2).optional(),
});
//# sourceMappingURL=pharmacie.schema.js.map