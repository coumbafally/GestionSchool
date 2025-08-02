export interface MatiereClasseEnseignant {
  id: number;
  classe_id: number;
  matiere_id: number;
  enseignant_id: number;
  classe?: { id: number; nom: string };
  matiere?: { id: number; nom: string };
  enseignant?: {
    id: number;
    matricule: string;
    user?: {
      nom: string;
      prenom: string;
    };
  };
}
