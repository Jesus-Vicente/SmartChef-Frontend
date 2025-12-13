import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '',
  redirectTo: 'home',
  pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
  },

  {
    path: 'agregar-receta',
    loadComponent: () => import('./pages/agregar-receta/agregar-receta.page').then(m => m.AgregarRecetaPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'carrito',
    loadComponent: () => import('./pages/carrito/carrito.page').then(m => m.CarritoPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'recetas-guardadas',
    loadComponent: () => import('./pages/recetas-guardadas/recetas-guardadas.page').then(m => m.RecetasGuardadasPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'historial',
    loadComponent: () => import('./pages/historial/historial.page').then(m => m.HistorialPage),
    data: {
      animation: 'fade'
    }
  },

  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
    data: {
      animation: 'fade'
    }
  },
  {
    path: 'detalle-receta/:id',
    loadComponent: () => import('./pages/detalle-receta/detalle-receta.page').then( m => m.DetalleRecetaPage),
    data: {
      animation: 'fade'
    }
  }



];
