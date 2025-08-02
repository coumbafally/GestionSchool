import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../../../core/models/eleve.model';


@Injectable({
    providedIn: 'root'
})
export class EleveService {

    private apiUrl = 'http://localhost:8000/api/admin/eleves';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Eleve[]> {
        return this.http.get<Eleve[]>(`${this.apiUrl}`);
    }

    getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
    }

    getEleveWithDocuments(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    getByClasse(classeNom: string): Observable<Eleve[]> {
        return this.http.get<Eleve[]>(`${this.apiUrl}/classe/${classeNom}`);
    }

    getByNiveau(niveau: string): Observable<Eleve[]> {
        return this.http.get<Eleve[]>(`${this.apiUrl}/niveau/${niveau}`);
    }

    create(eleve: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}`, eleve);
    }

    update(id: number, eleve: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, eleve); 
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    registerUser(data: any) {
        return this.http.post('http://localhost:8000/api/auth/register', data);
    }



}
