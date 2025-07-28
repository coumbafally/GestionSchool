export interface Classe {
  id: number;
  nom: string;
  niveau: string;
  created_at: string; // Les dates arrivent souvent sous forme de chaînes de caractères depuis les API
  updated_at: string;
}