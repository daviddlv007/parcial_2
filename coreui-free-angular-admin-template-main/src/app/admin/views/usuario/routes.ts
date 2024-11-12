import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./usuario.component').then(m => m.UsuarioComponent),
    data: {
      title: $localize`Usuarios`
    }
  },
  {
    path: 'formulario',  // Ruta para el formulario de usuario (registro o edición)
    loadComponent: () => import('./formulario.usuario.component').then(m => m.FormularioUsuarioComponent),
    data: {
      title: $localize`Formulario Usuario`
    }
  },
  {
    path: 'formulario/:id',  // Ruta para el formulario de edición de usuario (con id)
    loadComponent: () => import('./formulario.usuario.component').then(m => m.FormularioUsuarioComponent),
    data: {
      title: $localize`Formulario Usuario`
    }
  }
];

