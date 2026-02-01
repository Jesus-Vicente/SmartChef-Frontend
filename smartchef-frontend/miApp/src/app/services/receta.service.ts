  import {inject, Injectable} from '@angular/core';
  import { Observable } from 'rxjs';
  import {HttpClient, HttpParams} from '@angular/common/http';
  import { Receta } from "../models/Receta.model";
  import {RecetaCrear} from "../models/RecetaCrear.model";
  import {RecetaDetalles} from "../models/RecetaDetalles.model";
  import {AsociarIngrediente} from "../models/AsociarIngrediente.model";

  @Injectable({
    providedIn: 'root'
  })
  export class RecetaService {

    private clienteHttp= inject(HttpClient);

    private readonly URL_BASE = "https://backend-smartcheft.onrender.com/receta"

    obtenerReceta():Observable<Receta[]> {
      return this.clienteHttp.get<Receta[]>(`${this.URL_BASE}/all`)
    }

    obtenerRecetasFiltradas(
      preferencias: string[],
      ingredientes: string[]
    ): Observable<Receta[]> {
      let parametros = new HttpParams();

      if (preferencias && preferencias.length > 0) {
        parametros = parametros.set("preferencias", preferencias.join(","));
      }

      if (ingredientes && ingredientes.length > 0) {
        parametros = parametros.set("ingredientes", ingredientes.join(","));
      }

      return this.clienteHttp.get<Receta[]>("${this.URL_BASE}/filtros-combinado", {params: parametros});
    }

    crearReceta(receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.post('${this.URL_BASE}/crear', receta)
    }

    detalleReceta(id: number): Observable<RecetaDetalles> {
      return this.clienteHttp.get<RecetaDetalles>(`${this.URL_BASE}/detalle/${id}`)
    }


    obtenerRecetasConIngredientes(id:number): Observable<RecetaCrear> {
      return this.clienteHttp.get<RecetaCrear>(`${this.URL_BASE}/recetasConIngredientes/${id}`)
    }

    modificarReceta(id: number | null, receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.put(`${this.URL_BASE}/modificar/${id}`, receta)
    }



    eliminarReceta(id: number): Observable<any> {
      return this.clienteHttp.delete(`${this.URL_BASE}/eliminar/${id}`)
    }


  }
