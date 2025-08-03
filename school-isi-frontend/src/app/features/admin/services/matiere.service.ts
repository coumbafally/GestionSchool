import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../../../core/models/matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiUrl = 'http://localhost:8000/api/admin/matieres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiUrl);
  }

  getById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.apiUrl}/${id}`);
  }

  create(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiUrl, matiere);
  }

  update(id: number, matiere: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiUrl}/${id}`, matiere);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
