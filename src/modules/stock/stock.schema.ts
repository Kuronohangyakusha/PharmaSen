import { z } from 'zod';

/**
 * Schéma de validation pour l'ajout d'un médicament au stock.
 */
export const creerStockSchema = z.object({
  medicamentId: z.string().uuid('ID médicament invalide'),
  quantite: z.number().int().min(0, 'La quantité ne peut pas être négative'),
  prix: z.number().min(0, 'Le prix ne peut pas être négatif'),
  estDisponible: z.boolean().default(true),
});

/**
 * Schéma de validation pour la modification d'un stock.
 */
export const modifierStockSchema = z.object({
  quantite: z.number().int().min(0).optional(),
  prix: z.number().min(0).optional(),
  estDisponible: z.boolean().optional(),
});

export type CreerStockDto = z.infer<typeof creerStockSchema>;
export type ModifierStockDto = z.infer<typeof modifierStockSchema>;