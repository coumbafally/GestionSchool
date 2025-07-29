import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../../../core/models/classe.model';



@Injectable({ providedIn: 'root' })
export class ClasseService {
    private apiUrl = 'http://localhost:8000/api/admin/classes';
    constructor(private http: HttpClient) {}
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
