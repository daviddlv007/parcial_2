import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; // Endpoint de tu backend

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any> {
    const credentials = {
      correo: correo,
      contrasena: contrasena
    };

    return this.http.post(this.apiUrl, credentials);
  }
}
