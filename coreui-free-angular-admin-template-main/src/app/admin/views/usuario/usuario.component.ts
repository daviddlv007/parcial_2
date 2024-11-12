import { Component, OnInit } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface IUser {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  _links: {
    self: {
      href: string;
    };
  };
}

@Component({
  templateUrl: 'usuario.component.html',
  styleUrls: ['usuario.component.scss'],
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
export class UsuarioComponent implements OnInit {

  public users: IUser[] = [];
  public filteredUsers: IUser[] = [];
  public filterText = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<any>(`${this.apiUrl}/usuarios`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.users = response._embedded?.usuarios?.map((user: IUser) => ({
            ...user,
            id: this.extractIdFromUrl(user._links.self.href)
          })) || [];
          this.users.sort((a, b) => b.id - a.id);
          this.applyFilter();
        },
        error: (err) => console.error('Error al cargar usuarios', err)
      });
  }

  private extractIdFromUrl(url: string): number {
    return parseInt(url.split('/').pop() ?? '-1', 10);
  }

  applyFilter(): void {
    const filterTextLower = this.filterText.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      [user.nombre, user.apellido, user.correo].some(field => field.toLowerCase().includes(filterTextLower))
    );
  }

  goToUpdateForm(userId: number): void {
    this.router.navigate(['/usuario/formulario', userId]);
  }

  confirmDelete(userId: number): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.deleteUser(userId);
    }
  }

  private deleteUser(userId: number): void {
    this.http.delete(`${this.apiUrl}/usuarios/${userId}`, { withCredentials: true })
      .subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.applyFilter();
        },
        error: (err) => console.error('Error al eliminar usuario', err)
      });
  }

  goToRegisterPage(): void {
    this.router.navigate(['/usuario/formulario']);
  }
}
