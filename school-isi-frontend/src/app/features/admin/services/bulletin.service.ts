import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bulletin } from '../../../core/models/bulletin.model';

@Injectable({ providedIn: 'root' })
export class BulletinService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Pour l'élève connecté
  getMesBulletins(): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(`${this.apiUrl}/eleve/bulletins`);
  }

  // Pour admin ou tuteur
  getBulletinByEleveAndPeriode(eleveId: number, periode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/eleves/${eleveId}/bulletin/${periode}`);
  }

  // Télécharger PDF
  downloadBulletinPdf(eleveId: number, periode: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/bulletins/${eleveId}/${encodeURIComponent(periode)}/pdf`, {
      responseType: 'blob'
    });
  }
  
  
  getBulletin(eleveId: number, periode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eleves/${eleveId}/bulletin/${periode}`);
  }

  getBulletinClasse(classeId: number, periode: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/admin/notes/classe/${classeId}/periode/${periode}`);
}
  getBulletinEleve(classeId: number, eleveId: number, periode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/notes/classe/${classeId}/eleve/${eleveId}/periode/${periode}`);
  }

getBulletinParEleve(eleveId: number, periode: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/admin/eleves/${eleveId}/bulletin/${periode}`);
}
  getBulletinParClasse(classeId: number, periode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/notes/classe/${classeId}/periode/${periode}`);
  } 
}
