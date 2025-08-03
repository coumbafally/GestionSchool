import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private apiUrl = 'http://localhost:8000/api/notes';

    constructor(private http: HttpClient) {}

    updateNote(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    getMoyenneParPeriode(eleveId: number, periode: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/moyenne/${eleveId}/${periode}`);
    }
    
    getNoteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
    }

}
