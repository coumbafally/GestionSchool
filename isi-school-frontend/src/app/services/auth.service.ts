import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  // lien du backend
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  seConnecter(identifiants: { email: string, mot_de_passe: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/connexion`, identifiants);
  }

  seDeconnecter(): Observable<any> {
    return this.http.post(`${this.apiUrl}/deconnexion`, {});
  }

  getUtilisateurActuel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Utilisateur`);
  }
}
