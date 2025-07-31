import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant } from '../../../core/models/enseignant.model';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiUrl = 'http://localhost:8000/api/admin/enseignants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.apiUrl);
  }

  getById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.apiUrl}/${id}`);
  }

  create(data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}`, data);
}

  
update(id: number, data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, data); 
}

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/register', data);
  }
}
