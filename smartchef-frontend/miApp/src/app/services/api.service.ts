import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Receta {
  id:number;
  usuario_creador_id: number | null;
  id_foto: number | null;
  nombre: string;
  descripcion: string | null;
  instrucciones: string | null;
  tiempo_preparacion: number | null;
  dificultad: string | null;
  costo_estimado: number | null;
  valoracion_promedio: number | null;
  fecha_creacion: string ; // fecha como ISO string
  activa: boolean
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {º
  private urlBackend = 'http://localhost:8080/smartchef-backend/api/'

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<Receta[]>{
    return this.http.get<Receta[]>(this.urlBackend + '/receta');
  }

  crearReceta(receta: Receta): Observable<Receta>{
    return this.http.post<Receta>(this.urlBackend + '/receta', receta);
  }

}
