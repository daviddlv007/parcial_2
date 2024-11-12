import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, NgClass]
})
export class LoginComponent {
    correo = '';
    contrasena = '';
    message = '';

    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient, private router: Router) {}

  
    login() {
        const loginData = { correo: this.correo, contrasena: this.contrasena };
        
        this.http.post(`${this.apiUrl}/api/auth/login`, loginData, { responseType: 'text' })
          .subscribe({
            next: (response) => {
              localStorage.setItem('authToken', response);
              this.router.navigate(['/usuario']);
            },
            error: (error) => {
              this.message = 'Credenciales Incorrectas.';
              console.error('Error de login:', error);
            }
          });
      }
  }
