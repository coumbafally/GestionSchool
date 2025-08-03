import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../../../core/models/eleve.model';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/eleves';

  constructor(private http: HttpClient) { }

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl);
  }

  createEleve(formData: FormData): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl, formData);
  }

  updateEleve(id: number, formData: FormData): Observable<Eleve> {
    formData.append('_method', 'PUT');
    return this.http.post<Eleve>(`${this.apiUrl}/${id}`, formData);
  }

  deleteEleve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}