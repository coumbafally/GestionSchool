import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatiereClasseEnseignant } from '../../../core/models/matiere-classe-enseignant.model';

@Injectable({ providedIn: 'root' })
export class MatiereClasseEnseignantService {
  private apiUrl = 'http://localhost:8000/api/admin/affectations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MatiereClasseEnseignant[]> {
    return this.http.get<MatiereClasseEnseignant[]>(this.apiUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getByClasse(classeId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/classe/${classeId}`);
}

}
