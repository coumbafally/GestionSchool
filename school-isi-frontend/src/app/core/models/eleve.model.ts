<<<<<<< HEAD
import { Classe } from './classe.model';

// Interface pour les données utilisateur de base associées à un élève
export interface UserInfo {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface Eleve {
  id?: number;
  // Champs du profil Eleve
  date_naissance: string; // ex: '2005-10-15'
  lieu_naissance: string;
  adresse: string;
  identifiant_eleve: string;
  // Relations chargées par l'API
  user?: UserInfo;
  classe?: Classe;
  // Champs pour la création (ne sont pas dans le modèle Eleve)
  nom?: string;
  prenom?: string;
  email?: string;
  classe_id?: number;
=======
export interface Eleve {
  id?: number;
  user_id: number;
  classe_id: number;
  date_naissance: string;
  lieu_naissance: string;
  adresse: string;
  identifiant_eleve: string;
  user?: any;
  classe?: any;
>>>>>>> origin/magou
}