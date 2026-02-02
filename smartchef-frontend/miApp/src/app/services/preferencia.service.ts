import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Preferencia} from "../models/Preferencia.model";

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {

  private clientHttp= inject(HttpClient);
  private readonly URL_BASE = "https://backend-smartcheft.onrender.com/preferencia";

  obtenerPreferencia():Observable<Preferencia[]> {
    return this.clientHttp.get<Preferencia[]>(`${this.URL_BASE}/all`);
  }
}
