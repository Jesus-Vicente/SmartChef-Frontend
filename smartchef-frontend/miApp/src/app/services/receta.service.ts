  import {inject, Injectable} from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { Receta } from "../models/Receta.model";
  import { map } from 'rxjs/operators';
  import { of } from 'rxjs';
  import {environment} from "../../environments/environment";
  import {RecetaCrear} from "../models/RecetaCrear.model";
  import {RecetaDetalles} from "../models/RecetaDetalles.model";
  import {AsociarIngrediente} from "../models/AsociarIngrediente.model";

  @Injectable({
    providedIn: 'root'
  })
  export class RecetaService {

    private clienteHttp= inject(HttpClient);

    obtenerReceta():Observable<Receta[]> {
      return this.clienteHttp.get<Receta[]>("/api/recetas/all")
    }

    crearReceta(receta: RecetaCrear): Observable<any> {
      return this.clienteHttp.post("/api/receta/crear", receta)
    }

    detalleReceta(id: number): Observable<RecetaDetalles> {
      return this.clienteHttp.get<RecetaDetalles>(`/api/receta/detalle/${id}`)
    }

    vincularIngrediente(asociacion: AsociarIngrediente) {
      return this.clienteHttp.put("/api/receta/ingrediente/vincular", asociacion)
    }

    desvincularIngrediente(asociacion: AsociarIngrediente) {
      return this.clienteHttp.put("/api/receta/ingrediente/desvincular/", asociacion)
    }

    eliminarReceta(id: number): Observable<any> {
      return this.clienteHttp.delete(`/api/receta/eliminar/${id}`)
    }


  }
