export interface Note {
  id?: number;
  eleve_id: number;
  mce_id: number;
  type: 'Devoir' | 'Examen';
  note: number;
  coefficient?: number;
  appreciation?: string;
  periode: string;

  eleve?: {
    id: number;
    classe_id?: number;
    classe?: {
      id: number;
      nom: string;
      niveau: string;
    };
    user: {
      nom: string;
      prenom: string;
    };
  };

  matiere_classe_enseignant?: {
    id: number;
    matiere: {
      nom: string;
    };
    classe: {
      nom: string;
      niveau: string;
    };
    enseignant: {
      user: {
        nom: string;
        prenom: string;
      };
    };
  };
}
