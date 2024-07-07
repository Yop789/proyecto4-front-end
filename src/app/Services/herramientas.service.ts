import { Herramientas } from './../Models/herramientas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root',
})
export class HerramientasService {
  url = `${environment.url}herramientas`;

  constructor(private http: HttpClient, private alert: AlertasService) {}

  getHerramientas() {
    return this.http.get(this.url);
  }

  getHerraminetaById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  deleteHerramienta(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  updateHerramienta(data: any) {
    return this.http.put(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/herramientas', 'Herramienta Actualizada');
        }
      },
      (error) => {
        this.alert.alertaError('Herramienta No Actualizo');
      }
    );
  }

  createHerramienta(data: any) {
    return this.http.post(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/herramientas', 'Herramienta Creado');
        }
      },
      (error) => {
        this.alert.alertaError('Herramienta No Creado');
      }
    );
  }
  getTiposHerramientas() {
    return this.http.get(`${this.url}/tipos`);
  }
}
