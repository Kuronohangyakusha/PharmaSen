import { z } from 'zod';

const coordonneesOptionnelles = {
  latitude: z.number().optional(),
  longitude: z.number().optional(),
};

/**
 * Schéma de validation pour la création d'une pharmacie.
 * Latitude et longitude sont optionnels - ils seront automatiquement récupérés
 * via la géolocalisation du navigateur si non fournis.
 */
export const creerPharmacieSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  quartier: z.string().min(2, 'Le quartier est requis'),
  telephone: z.string().min(9, 'Le téléphone est requis'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
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

/**
 * Schéma de validation pour le changement de statut d'ouverture.
 */
export const changerStatutSchema = z.object({
  estOuverte: z.boolean(),
});

export type ChangerStatutDto = z.infer<typeof changerStatutSchema>;

export type CreerPharmacieDto = z.infer<typeof creerPharmacieSchema>;
export type ModifierPharmacieDto = z.infer<typeof modifierPharmacieSchema>;