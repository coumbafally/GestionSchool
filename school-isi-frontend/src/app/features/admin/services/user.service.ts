import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ 
    providedIn: 'root' 
})
export class UserService {
    private apiUrl = 'http://localhost:8000/api/admin/users';
    constructor(private http: HttpClient) {}
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    register(userData: any) {
        return this.http.post('http://localhost:8000/api/auth/register', userData);
    }
}