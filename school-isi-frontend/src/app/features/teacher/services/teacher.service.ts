import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = 'http://localhost:8000/api/teacher';

  constructor(private http: HttpClient) {}

  getMesClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-classes`);
  }

  getElevesParClasse(classeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eleves/${classeId}`);
  }
}
