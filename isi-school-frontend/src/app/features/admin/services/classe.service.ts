import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
    private apiUrl = 'http://127.0.0.1:8000/api/admin/classes';

  constructor(private http: HttpClient) { }
   getClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Créer une classe
  createClasse(classe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, classe);
  }

  // Mettre à jour une classe
  updateClasse(id: number, classe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, classe);
  }

  // Supprimer une classe
  deleteClasse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
