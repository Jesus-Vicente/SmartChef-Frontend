import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ingrediente} from "../models/Ingrediente.model";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private clientHttp = inject(HttpClient);

  obtenerIngredientes(): Observable<Ingrediente[]> {
    return this.clientHttp.get<Ingrediente[]>('/api/ingrediente/all');
  }

  obtenerIngredientesFiltro(): Observable<string[]> {
    return this.clientHttp.get<string[]>('/api/ingrediente/nombresFiltro');
  }

}
