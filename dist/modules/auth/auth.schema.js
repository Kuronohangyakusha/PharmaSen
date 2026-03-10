"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connexionSchema = exports.inscriptionSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma de validation pour l'inscription d'un pharmacien.
 */
exports.inscriptionSchema = zod_1.z.object({
    nom: zod_1.z
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: zod_1.z
        .string()
        .email('Email invalide'),
    motDePasse: zod_1.z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});
/**
 * Schéma de validation pour la connexion.
 */
exports.connexionSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Email invalide'),
    motDePasse: zod_1.z
        .string()
        .min(1, 'Le mot de passe est requis'),
});
//# sourceMappingURL=auth.schema.js.map