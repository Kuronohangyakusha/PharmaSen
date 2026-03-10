import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une pharmacie.
 */
export const creerPharmacieSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  quartier: z.string().min(2, 'Le quartier est requis'),
  telephone: z.string().min(9, 'Le téléphone est requis'),
  latitude: z.number({ message: 'La latitude est requise' }),
  longitude: z.number({ message: 'La longitude est requise' }),
  horaires: z.string().min(2, 'Les horaires sont requis'),
});

/**
 * Schéma de validation pour la modification d'une pharmacie.
 */
export const modifierPharmacieSchema = z.object({
  nom: z.string().min(2).optional(),
  adresse: z.string().min(5).optional(),
  quartier: z.string().min(2).optional(),
  telephone: z.string().min(9).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  horaires: z.string().min(2).optional(),
});

export type CreerPharmacieDto = z.infer<typeof creerPharmacieSchema>;
export type ModifierPharmacieDto = z.infer<typeof modifierPharmacieSchema>;