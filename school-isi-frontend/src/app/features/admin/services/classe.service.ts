import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../../../models/classe.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/classes';

 constructor(private http: HttpClient) { }

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }

  createClasse(classeData: { nom: string, niveau: string }): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, classeData);
  }

  updateClasse(id: number, classeData: { nom: string, niveau: string }): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classeData);
  }

  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
