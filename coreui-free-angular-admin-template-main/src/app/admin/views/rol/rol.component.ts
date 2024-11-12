import { Component, OnInit } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface IRole {
  id: number;
  nombre: string;
  descripcion: string;
  interfazNombre: string;
  _links: {
    self: {
      href: string;
    };
    interfazRol: {
      href: string;
    };
  };
}

@Component({
  templateUrl: 'rol.component.html',
  styleUrls: ['rol.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    TableDirective,
    FormsModule
  ]
})
export class RolComponent implements OnInit {

  public roles: IRole[] = [];
  public filteredRoles: IRole[] = [];
  public filterText = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.http.get<any>(`${this.apiUrl}/roles`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          // Obtener los roles
          this.roles = response._embedded?.rols?.map((role: IRole) => ({
            ...role,
            id: this.extractIdFromUrl(role._links.self.href)
          })) || [];
          
          this.roles.forEach(role => {
            this.http.get<any>(role._links.interfazRol.href, { withCredentials: true })
              .subscribe({
                next: (interfaz) => {
                  role.interfazNombre = interfaz.nombre;
                  this.applyFilter();
                },
                error: (err) => console.error('Error al cargar interfaz', err)
              });
          });
          
          this.roles.sort((a, b) => b.id - a.id);
        },
        error: (err) => console.error('Error al cargar roles', err)
      });
  }

  private extractIdFromUrl(url: string): number {
    return parseInt(url.split('/').pop() ?? '-1', 10);
  }

  applyFilter(): void {
    const filterTextLower = this.filterText.toLowerCase();
    this.filteredRoles = this.roles.filter(role =>
      [role.nombre, role.descripcion, role.interfazNombre].some(field => field.toLowerCase().includes(filterTextLower))
    );
  }

  goToUpdateForm(roleId: number): void {
    this.router.navigate(['/rol/formulario', roleId]);
  }

  confirmDelete(roleId: number): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      this.deleteRole(roleId);
    }
  }

  private deleteRole(roleId: number): void {
    this.http.delete(`${this.apiUrl}/roles/${roleId}`, { withCredentials: true })
      .subscribe({
        next: () => {
          this.roles = this.roles.filter(role => role.id !== roleId);
          this.applyFilter();
        },
        error: (err) => console.error('Error al eliminar rol', err)
      });
  }

  goToRegisterPage(): void {
    this.router.navigate(['/rol/formulario']);
  }
}
