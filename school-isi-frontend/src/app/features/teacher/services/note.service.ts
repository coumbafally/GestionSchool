import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Affectation, ApiResponse, Eleve, Note } from '../../../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = `http://localhost:8000/api/teacher`;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<ApiResponse<Note[]>> {
    return this.http.get<ApiResponse<Note[]>>(`${this.apiUrl}/notes`);
  }

  createNote(note: Omit<Note, 'id'>): Observable<ApiResponse<Note>> {
    return this.http.post<ApiResponse<Note>>(`${this.apiUrl}/notes`, note);
  }

  updateNote(id: number, note: Partial<Note>): Observable<ApiResponse<Note>> {
    return this.http.put<ApiResponse<Note>>(`${this.apiUrl}/notes/${id}`, note);
  }

  deleteNote(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/notes/${id}`);
  }

  getMesAffectations(): Observable<ApiResponse<Affectation[]>> {
    return this.http.get<ApiResponse<Affectation[]>>(`${this.apiUrl}/mes-affectations`);
  }

  getElevesParClasse(classeId: number): Observable<ApiResponse<Eleve[]>> {
    return this.http.get<ApiResponse<Eleve[]>>(`${this.apiUrl}/eleves/${classeId}`);
  }
}