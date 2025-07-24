import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tuteur } from '../../core/models/tuteur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuteurService {
  private apiUrl = 'http://localhost:8000/api/parents';

  constructor(private http: HttpClient) { }

  getTuteurs(): Observable<Tuteur[]> {
    return this.http.get<Tuteur[]>(this.apiUrl);
  }

  getTuteurById(id: number): Observable<Tuteur> {
    return this.http.get<Tuteur>(`${this.apiUrl}/${id}`);
  }

  createTuteur(data: Tuteur): Observable<Tuteur> {
    return this.http.post<Tuteur>(this.apiUrl, data);
  }

  updateTuteur(id: number, data: Tuteur): Observable<Tuteur> {
    return this.http.put<Tuteur>(`${this.apiUrl}/${id}`, data);
  }

  deleteTuteur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
