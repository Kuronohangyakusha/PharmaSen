// Tous les messages

/**
 * Messages centralisés de l'application pharmaSen.
 * Tous les messages d'erreur et de succès sont définis ici.
 */
export const MESSAGES = {
  // Authentification
  AUTH: {
    INSCRIPTION_SUCCES: 'Compte créé avec succès',
    CONNEXION_SUCCES: 'Connexion réussie',
    DECONNEXION_SUCCES: 'Déconnexion réussie',
    EMAIL_DEJA_UTILISE: 'Cet email est déjà utilisé',
    IDENTIFIANTS_INVALIDES: 'Email ou mot de passe incorrect',
    TOKEN_INVALIDE: 'Token invalide ou expiré',
    TOKEN_MANQUANT: 'Token d\'authentification manquant',
    ACCES_REFUSE: 'Accès refusé : permissions insuffisantes',
  },

  // Médicaments
  MEDICAMENT: {
    LISTE_SUCCES: 'Médicaments récupérés avec succès',
    TROUVE_SUCCES: 'Médicament trouvé',
    CREE_SUCCES: 'Médicament créé avec succès',
    MODIFIE_SUCCES: 'Médicament modifié avec succès',
    SUPPRIME_SUCCES: 'Médicament supprimé avec succès',
    INTROUVABLE: 'Médicament introuvable',
    RECHERCHE_SUCCES: 'Recherche effectuée avec succès',
  },

  // Pharmacies
  PHARMACIE: {
    LISTE_SUCCES: 'Pharmacies récupérées avec succès',
    TROUVE_SUCCES: 'Pharmacie trouvée',
    CREE_SUCCES: 'Pharmacie créée avec succès',
    MODIFIE_SUCCES: 'Pharmacie modifiée avec succès',
    SUPPRIME_SUCCES: 'Pharmacie supprimée avec succès',
    INTROUVABLE: 'Pharmacie introuvable',
    VALIDEE_SUCCES: 'Pharmacie validée avec succès',
    RECHERCHE_SUCCES: 'Pharmacies trouvées avec succès',
  },

  // Stocks
  STOCK: {
    LISTE_SUCCES: 'Stocks récupérés avec succès',
    CREE_SUCCES: 'Médicament ajouté au stock avec succès',
    MODIFIE_SUCCES: 'Stock modifié avec succès',
    SUPPRIME_SUCCES: 'Médicament retiré du stock avec succès',
    INTROUVABLE: 'Stock introuvable',
    DEJA_EXISTANT: 'Ce médicament est déjà dans votre stock',
  },

  // Gardes
  GARDE: {
    LISTE_SUCCES: 'Gardes récupérées avec succès',
    CREE_SUCCES: 'Garde déclarée avec succès',
    MODIFIE_SUCCES: 'Garde modifiée avec succès',
    SUPPRIME_SUCCES: 'Garde supprimée avec succès',
    INTROUVABLE: 'Garde introuvable',
  },

  // Erreurs générales
  GENERAL: {
    ERREUR_SERVEUR: 'Erreur interne du serveur',
    REQUETE_INVALIDE: 'Données de la requête invalides',
    TERME_RECHERCHE_VIDE: 'Le terme de recherche ne peut pas être vide',
  },

  // Utilisateurs
  UTILISATEUR: {
    LISTE_SUCCES: 'Utilisateurs récupérés avec succès',
    MODIFIE_SUCCES: 'Statut modifié avec succès',
    INTROUVABLE: 'Utilisateur introuvable',
  },
};