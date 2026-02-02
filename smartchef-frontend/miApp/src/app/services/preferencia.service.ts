import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Preferencia} from "../models/Preferencia.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {

  private clientHttp= inject(HttpClient);
  private readonly URL_BASE = `${environment.apiUrl}/preferencia`;

  obtenerPreferencia():Observable<Preferencia[]> {
    return this.clientHttp.get<Preferencia[]>(`${this.URL_BASE}/all`);
  }
}
