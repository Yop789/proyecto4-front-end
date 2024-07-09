import { url } from 'inspector';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LimpiezaService {
  url = environment.url + 'limpiar';
  urlDetalle = environment.url + 'detallelimpiar';
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getLimpiezas() {
    return this.http.get(this.url);
  }

  getLimpieza(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  getLimpiezaId(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteLimpieza(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  addLimpieza(limpieza: any) {
    return this.http.post(`${this.url}/seven-herramienta`, limpieza).subscribe(
      (res) => {
        if (res) {
          this.alert.alertaSuccess('/limpiezas', 'Limpieza Creada');
        }
      },
      (error) => {
        this.alert.alertaError('Limpieza No Creada');
      }
    );
  }

  updateLimpieza(id: any) {
    return this.http.get(`${this.url}/actualizar/${id}`);
  }

  getDetalleLimpieza(id: string) {
    return this.http.get(`${this.urlDetalle}/limpieza/${id}`);
  }
}
