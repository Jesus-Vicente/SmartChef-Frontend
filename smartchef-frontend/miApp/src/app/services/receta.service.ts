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

    obtenerReceta():Observable<Receta[]> {
      return this.clienteHttp.get<Receta[]>("/api/receta/all")
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

      return this.clienteHttp.get<Receta[]>("/api/receta/filtros-combinado", {params: parametros});
    }

    crearReceta(receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.post("/api/receta/crear", receta)
    }

    detalleReceta(id: number): Observable<RecetaDetalles> {
      return this.clienteHttp.get<RecetaDetalles>(`/api/receta/detalle/${id}`)
    }


    obtenerRecetasConIngredientes(id:number): Observable<RecetaCrear> {
      return this.clienteHttp.get<RecetaCrear>(`/api/receta/recetasConIngredientes/${id}`)
    }

    modificarReceta(id: number | null, receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.put(`/api/receta/modificar/${id}`, receta)
    }



    eliminarReceta(id: number): Observable<any> {
      return this.clienteHttp.delete(`/api/receta/eliminar/${id}`)
    }


  }
