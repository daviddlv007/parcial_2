import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./rol.component').then(m => m.RolComponent),
    data: {
      title: $localize`Roles`
    }
  },
  {
    path: 'formulario',  // Ruta para el formulario de rol (registro o edición)
    loadComponent: () => import('./formulario.rol.component').then(m => m.FormularioRolComponent),
    data: {
      title: $localize`Formulario Rol`
    }
  },
  {
    path: 'formulario/:id',  // Ruta para el formulario de edición de rol (con id)
    loadComponent: () => import('./formulario.rol.component').then(m => m.FormularioRolComponent),
    data: {
      title: $localize`Formulario Rol`
    }
  }
];
