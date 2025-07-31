export interface Enseignant {
  id?: number;
  user_id: number;
  matricule: string;
  user?: {
    nom: string;
    prenom: string;
    email: string;
  };
}
