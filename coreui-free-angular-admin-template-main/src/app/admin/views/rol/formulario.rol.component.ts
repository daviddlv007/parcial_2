import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface IInterfaz {
  id: number;
  nombre: string;
}

@Component({
  templateUrl: './formulario.rol.component.html',
  styleUrls: ['./formulario.rol.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormularioRolComponent implements OnInit {
  roleId?: number;
  roleForm: FormGroup;
  isUpdate: boolean = false;
  interfaces: IInterfaz[] = [];
  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roleForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      interfazRolId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadInterfaces();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.roleId = +id;
        this.isUpdate = true;
        console.log('ID del rol seleccionado:', this.roleId);
        this.loadRole(this.roleId);
      }
    });
  }

  private loadInterfaces(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/interfaz-roles`)
        .subscribe({
          next: (response) => {
            this.interfaces = response._embedded.interfazRols.map((interfaz: any) => ({
              id: this.extractIdFromUrl(interfaz._links.self.href),
              nombre: interfaz.nombre
            }));
            console.log('Interfaces cargadas:', this.interfaces);
            resolve();
          },
          error: (err) => {
            console.error('Error al cargar interfaces', err);
            reject(err);
          }
        });
    });
  }
  

  private loadRole(roleId: number): void {
    this.http.get<any>(`${this.apiUrl}/roles`).subscribe({
      next: (response) => {
        console.log('Roles cargados:', response._embedded.rols);
        const rol = response._embedded.rols.find((rol: any) => {
          // Extraer el ID del enlace 'self.href'
          const rolIdFromUrl = this.extractIdFromUrl(rol._links.self.href);
          return rolIdFromUrl === roleId;
        });
        // Paso 2: Obtener la URL de interfazRol del rol
        const interfazRolUrl = `${this.apiUrl}/roles/${this.roleId}/interfazRol`;
        console.log('URL de interfazRol:', interfazRolUrl);
  
        // Paso 3: Hacer una solicitud para obtener la interfaz asociada
        this.http.get<any>(interfazRolUrl).subscribe({
          next: (interfazResponse) => {
            console.log('Interfaz asociada:', interfazResponse);
  
            // Paso 4: Extraer el ID de la interfaz
            const interfazId = this.extractIdFromUrl(interfazResponse._links.interfazRol.href);
            console.log('ID de la interfaz:', interfazId);
  
            // Paso 5: Actualizar el formulario con los datos del rol y la interfaz
            this.roleForm.patchValue({
              nombre: rol.nombre,
              descripcion: rol.descripcion,
              interfazRolId: interfazId // Aquí asignamos el ID correcto de la interfaz
            });
  
            console.log('Formulario actualizado:', this.roleForm.value);
          },
          error: (err) => console.error('Error al cargar interfazRol', err),
        });
      },
      error: (err) => console.error('Error al cargar roles', err),
    });
  }
  

  saveRole(): void {
    if (this.roleForm.valid) {
      const role = this.roleForm.value;
      console.log('Formulario antes de guardar:', role);
      // Paso 1: Crear un objeto con todos los datos, incluyendo interfazRol para la creación
      const roleData = {
        nombre: role.nombre,
        descripcion: role.descripcion,
        interfazRol: { id: role.interfazRolId }  // Aseguramos que se incluya el interfazRol en la creación
      };
  
      // Realizamos la primera consulta para actualizar los campos excepto 'interfazRol'
      const request = this.isUpdate
        ? this.http.put(`${this.apiUrl}/roles/${this.roleId}`, roleData)  // Actualizamos solo 'nombre', 'descripcion' y 'interfazRol'
        : this.http.post(`${this.apiUrl}/roles`, roleData);  // En caso de creación, se incluyen todos los campos
  
      request.subscribe({
        next: () => {
          // Paso 2: Si es una actualización, actualizamos solo el campo 'interfazRol' (referenciador)
          if (this.isUpdate) {
            const interfazRolData = {
              interfazRol: {
                id: role.interfazRolId,  // Enviamos solo el ID del referenciador
              }
            };
  
            // Realizamos la segunda consulta para actualizar solo 'interfazRol' usando PATCH
            this.http.patch(`${this.apiUrl}/roles/${this.roleId}`, interfazRolData).subscribe({
              next: () => {
                this.router.navigate(['/rol']);  // Redirigimos después de la actualización completa
              },
              error: (err) => console.error('Error al actualizar interfazRol', err),
            });
          } else {
            // Si es creación, redirigimos al finalizar
            this.router.navigate(['/rol']);
          }
        },
        error: (err) => console.error(this.isUpdate ? 'Error al actualizar rol' : 'Error al registrar rol', err),
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  
  
  cancel(): void {
    this.router.navigate(['/rol']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.roleForm.get(field);
    return (control?.invalid && (control?.touched || control?.dirty)) ?? false;
  }

// Función para extraer el ID de la URL
private extractIdFromUrl(url: string): number | null {
  const regex = /\/(\d+)$/;
  const match = url.match(regex);
  return match ? parseInt(match[1], 10) : null; // Puede devolver null si no se encuentra el ID
}
}
