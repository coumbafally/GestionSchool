export interface Bulletin {
    periode: string;
    moyenne: number;
    mention: string;
    notes: {
        matiere: string;
        type: string;
        note: number;
        coef: number;
        appreciation: string;
    }[];
}
