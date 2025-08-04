import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BulletinService {
  private apiUrl = 'http://localhost:8000/api/admin/bulletins';

  constructor(private http: HttpClient) {}

  getBulletin(eleveId: number, periode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eleves/${eleveId}/bulletin/${periode}`);
  }
}
