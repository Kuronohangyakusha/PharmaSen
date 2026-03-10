import { z } from 'zod';

/**
 * Schéma de validation pour la création d'un médicament.
 */
export const creerMedicamentSchema = z.object({
  nomCommercial: z.string().min(2, 'Le nom commercial est requis'),
  nomGenerique: z.string().min(2, 'Le nom générique est requis'),
  description: z.string().optional(),
  categorie: z.string().min(2, 'La catégorie est requise'),
});

/**
 * Schéma de validation pour la modification d'un médicament.
 */
export const modifierMedicamentSchema = z.object({
  nomCommercial: z.string().min(2).optional(),
  nomGenerique: z.string().min(2).optional(),
  description: z.string().optional(),
  categorie: z.string().min(2).optional(),
});

export type CreerMedicamentDto = z.infer<typeof creerMedicamentSchema>;
export type ModifierMedicamentDto = z.infer<typeof modifierMedicamentSchema>;