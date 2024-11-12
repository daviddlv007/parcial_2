import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './formulario.usuario.component.html',
  styleUrls: ['./formulario.usuario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormularioUsuarioComponent implements OnInit {
  userId?: number;
  userForm: FormGroup;
  isUpdate: boolean = false;
  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.isUpdate = true;
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(userId: number): void {
    this.http.get<any>(`${this.apiUrl}/usuarios/${userId}`).subscribe({
      next: response => this.userForm.setValue({
        nombre: response.nombre,
        apellido: response.apellido,
        correo: response.correo,
        contrasena: '', // No cargar la contraseña por razones de seguridad
      }),
      error: err => console.error('Error al cargar usuario', err),
    });
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const request = this.isUpdate
        ? this.http.put(`${this.apiUrl}/usuarios/${this.userId}`, user)
        : this.http.post(`${this.apiUrl}/usuarios`, user);

      request.subscribe({
        next: () => this.router.navigate(['/usuario']),
        error: err => console.error(this.isUpdate ? 'Error al actualizar usuario' : 'Error al registrar usuario', err),
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  cancel(): void {
    this.router.navigate(['/usuario']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return (control?.invalid && (control?.touched || control?.dirty)) ?? false;
  }
}
