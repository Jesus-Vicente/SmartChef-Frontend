import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ingrediente} from "../models/Ingrediente.model";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private clientHttp = inject(HttpClient);
  private readonly URL_BASE = "https://backend-smartcheft.onrender.com/ingrediente";

  obtenerIngredientes(): Observable<Ingrediente[]> {
    return this.clientHttp.get<Ingrediente[]>(`${this.URL_BASE}/all`);
  }

  obtenerIngredientesFiltro(): Observable<string[]> {
    return this.clientHttp.get<string[]>(`${this.URL_BASE}/nombresFiltro`);
  }

}
