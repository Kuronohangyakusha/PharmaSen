import { z } from 'zod';

/**
 * Schéma de validation pour l'inscription d'un pharmacien.
 */
export const inscriptionSchema = z.object({
  nom: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z
    .string()
    .email('Email invalide'),
  motDePasse: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

/**
 * Schéma de validation pour la connexion.
 */
export const connexionSchema = z.object({
  email: z
    .string()
    .email('Email invalide'),
  motDePasse: z
    .string()
    .min(1, 'Le mot de passe est requis'),
});

// Types TypeScript générés depuis les schémas Zod
export type InscriptionDto = z.infer<typeof inscriptionSchema>;
export type ConnexionDto = z.infer<typeof connexionSchema>;