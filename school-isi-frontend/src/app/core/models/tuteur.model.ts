export interface Tuteur {
    id?: number;
    numero_tel: string;
    user_id: number;
    eleve_id: number;
    identifiant_tuteur?: string;

    user?: {
        id: number;
        nom: string;
        prenom: string;
    };

    eleve?: {
        id: number;
        nom: string;
    };
}
