import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Preferencia} from "../models/Preferencia.model";

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {

  private clientHttp= inject(HttpClient);

  obtenerPreferencia():Observable<Preferencia[]> {
    return this.clientHttp.get<Preferencia[]>('/api/preferencia/all');
  }
}
