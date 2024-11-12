import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem('authToken');

    // Si el token no existe, redirigir a la página de login
    if (!token) {
      this.router.navigate(['loginapp']);
      return false;
    }

    // Si el token existe, permitir el acceso a la ruta
    return true;
  }
}
