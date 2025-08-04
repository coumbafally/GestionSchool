// note.model.ts
export interface Note {
  id?: number;
  eleve_id: number;
  mce_id: number;
  type: 'Devoir' | 'Examen';
  periode: string;
  note: number;
  coefficient: number;
  appreciation?: string;
  created_at?: string;
  updated_at?: string;
  eleve?: {
    id: number;
    user: {
      nom: string;
      prenom: string;
    };
  };
  matiere_classe_enseignant?: {
    id: number;
    matiere: {
      id: number;
      nom: string;
    };
    classe: {
      id: number;
      nom: string;
    };
  };
}

// affectation.model.ts
export interface Affectation {
  id: number;
  classe_id: number;
  matiere_id: number;
  enseignant_id: number;
  matiere: {
    id: number;
    nom: string;
  };
  classe: {
    id: number;
    nom: string;
  };
}

// eleve.model.ts
export interface Eleve {
  id: number;
  user_id: number;
  user: {
    id: number;
    nom: string;
    prenom: string;
  };
}

// api-response.model.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}