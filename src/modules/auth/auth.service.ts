import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository';
import { ErreurApplication } from '../../utils/erreur.util';
import { CODES_HTTP } from '../../constantes/codes-http';
import { MESSAGES } from '../../constantes/messages';
import { InscriptionDto, ConnexionDto } from './auth.schema';

/**
 * Service d'authentification.
 * Contient la logique métier pour l'inscription et la connexion.
 */
export const authService = {

  /**
   * Inscrit un nouveau pharmacien.
   * Vérifie que l'email n'est pas déjà utilisé et hache le mot de passe.
   * @param donnees - Données d'inscription validées
   */
  inscrire: async (donnees: InscriptionDto) => {
    // Vérifier si l'email est déjà utilisé
    const utilisateurExistant = await authRepository.trouverParEmail(donnees.email);
    if (utilisateurExistant) {
      throw new ErreurApplication(
        MESSAGES.AUTH.EMAIL_DEJA_UTILISE,
        CODES_HTTP.CONFLIT
      );
    }

    // Hacher le mot de passe
    const rounds = Number(process.env.BCRYPT_ROUNDS) || 12;
    const motDePasseHache = await bcrypt.hash(donnees.motDePasse, rounds);

    // Créer l'utilisateur avec le rôle PHARMACIEN
    const nouvelUtilisateur = await authRepository.creerUtilisateur({
      nom: donnees.nom,
      email: donnees.email,
      motDePasse: motDePasseHache,
      role: 'PHARMACIEN',
    });

    return nouvelUtilisateur;
  },

  /**
   * Connecte un utilisateur et retourne un token JWT.
   * @param donnees - Email et mot de passe de connexion
   */
  connecter: async (donnees: ConnexionDto) => {
    // Vérifier si l'utilisateur existe
    const utilisateur = await authRepository.trouverParEmail(donnees.email);
    if (!utilisateur) {
      throw new ErreurApplication(
        MESSAGES.AUTH.IDENTIFIANTS_INVALIDES,
        CODES_HTTP.NON_AUTHENTIFIE
      );
    }

    // Vérifier le mot de passe
    const motDePasseValide = await bcrypt.compare(
      donnees.motDePasse,
      utilisateur.motDePasse
    );
    if (!motDePasseValide) {
      throw new ErreurApplication(
        MESSAGES.AUTH.IDENTIFIANTS_INVALIDES,
        CODES_HTTP.NON_AUTHENTIFIE
      );
    }

    // Générer le token JWT
    const secret = process.env.JWT_SECRET as string;

const token = jwt.sign(
  {
    id: utilisateur.id,
    email: utilisateur.email,
    role: utilisateur.role,
  },
  secret,
  { expiresIn: '7d' }
);

    return {
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    };
  },

  /**
   * Récupère le profil de l'utilisateur connecté.
   * @param id - Identifiant de l'utilisateur
   */
  obtenirProfil: async (id: string) => {
    const utilisateur = await authRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(
        MESSAGES.AUTH.TOKEN_INVALIDE,
        CODES_HTTP.NON_AUTHENTIFIE
      );
    }
    return utilisateur;
  },

  /**
   * Modifie le profil de l'utilisateur connecté.
   * @param id - Identifiant de l'utilisateur
   * @param donnees - Données à modifier
   */
  modifierProfil: async (id: string, donnees: { nom?: string; email?: string }) => {
    const utilisateur = await authRepository.trouverParId(id);
    if (!utilisateur) {
      throw new ErreurApplication(
        MESSAGES.AUTH.TOKEN_INVALIDE,
        CODES_HTTP.NON_AUTHENTIFIE
      );
    }
    return authRepository.modifierUtilisateur(id, donnees);
  },
};