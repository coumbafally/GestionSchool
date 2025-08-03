import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../../../core/models/note.model';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private apiUrl = 'http://localhost:8000/api/admin/notes';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Note[]> {
        return this.http.get<Note[]>(this.apiUrl);
    }

    getById(id: number): Observable<Note> {
        return this.http.get<Note>(`${this.apiUrl}/${id}`);
    }

    getByEleve(eleveId: number): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}`);
    }

    getByClasseAndPeriode(classeId: number, periode: string): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/classe/${classeId}/periode/${periode}`);
    }

    create(data: Note): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    update(id: number, data: Note): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
