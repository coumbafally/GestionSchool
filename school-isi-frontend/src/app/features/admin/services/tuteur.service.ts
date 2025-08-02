import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tuteur } from '../../../core/models/tuteur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuteurService {
  private apiUrl = 'http://localhost:8000/api/admin/tuteurs';

  constructor(private http: HttpClient) {}

  getAllTuteur(): Observable<Tuteur[]> {
    return this.http.get<Tuteur[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(tuteur: Tuteur): Observable<Tuteur> {
    return this.http.post<Tuteur>(this.apiUrl, tuteur);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: Partial<Tuteur>): Observable<Tuteur> {
    return this.http.put<Tuteur>(`${this.apiUrl}/${id}`, data);
  }
}
