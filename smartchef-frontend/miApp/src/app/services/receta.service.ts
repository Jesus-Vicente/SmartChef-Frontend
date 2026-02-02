  import {inject, Injectable} from '@angular/core';
  import { Observable } from 'rxjs';
  import {HttpClient, HttpParams} from '@angular/common/http';
  import { Receta } from "../models/Receta.model";
  import {RecetaCrear} from "../models/RecetaCrear.model";
  import {RecetaDetalles} from "../models/RecetaDetalles.model";
  import { environment } from '../../environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class RecetaService {

    private clienteHttp = inject(HttpClient);
    private readonly URL_BASE = "https://backend-smartcheft.onrender.com/receta";

    obtenerReceta(): Observable<Receta[]> {
      return this.clienteHttp.get<Receta[]>(`https://backend-smartcheft.onrender.com/receta/all`);
    }

    obtenerRecetasFiltradas(preferencias: string[], ingredientes: string[]): Observable<Receta[]> {
      let parametros = new HttpParams();

      if (preferencias && preferencias.length > 0) {
        parametros = parametros.set("preferencias", preferencias.join(","));
      }

      if (ingredientes && ingredientes.length > 0) {
        parametros = parametros.set("ingredientes", ingredientes.join(","));
      }


      return this.clienteHttp.get<Receta[]>(`${this.URL_BASE}/filtros-combinado`, { params: parametros });
    }

    crearReceta(receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.post(`${this.URL_BASE}/crear`, receta);
    }

    detalleReceta(id: number): Observable<RecetaDetalles> {
      return this.clienteHttp.get<RecetaDetalles>(`https://backend-smartcheft.onrender.com/receta/detalle/${id}`);
    }

    obtenerRecetasConIngredientes(id: number): Observable<RecetaCrear> {
      return this.clienteHttp.get<RecetaCrear>(`https://backend-smartcheft.onrender.com/receta/recetasConIngredientes/${id}`);
    }

    modificarReceta(id: number | null, receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.put(`https://backend-smartcheft.onrender.com/receta/modificar/${id}`, receta);
    }

    eliminarReceta(id: number): Observable<any> {
      return this.clienteHttp.delete(`https://backend-smartcheft.onrender.com/receta/eliminar/${id}`);
    }
  }
