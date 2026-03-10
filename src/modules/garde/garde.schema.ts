import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une garde.
 */
export const creerGardeSchema = z.object({
  dateDebut: z.string().datetime('Date de début invalide'),
  dateFin: z.string().datetime('Date de fin invalide'),
  typeGarde: z.enum(['JOUR', 'NUIT']).default('JOUR'),
});

/**
 * Schéma de validation pour la modification d'une garde.
 */
export const modifierGardeSchema = z.object({
  dateDebut: z.string().datetime().optional(),
  dateFin: z.string().datetime().optional(),
  typeGarde: z.enum(['JOUR', 'NUIT']).optional(),
});

export type CreerGardeDto = z.infer<typeof creerGardeSchema>;
export type ModifierGardeDto = z.infer<typeof modifierGardeSchema>;