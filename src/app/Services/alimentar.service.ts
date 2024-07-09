import { url } from 'inspector';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AlimentarService {
  url = `${environment.url}alimentar`;
  urlDetalle = `${environment.url}detallealimentar`;
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getalimentar() {
    return this.http.get(this.url);
  }

  getAlimentar(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  getAlimentarId(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteAlimentar(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  addAlimentar(Alimentar: any) {
    return this.http.post(`${this.url}/seven-herramienta`, Alimentar).subscribe(
      (res) => {
        if (res) {
          this.alert.alertaSuccess('/alimentar', 'Tarea alimentar iniciada');
        }
      },
      (error) => {
        this.alert.alertaError('La tarea no se pudo iniciar');
      }
    );
  }

  updateAlimentar(id: any) {
    return this.http.get(`${this.url}/actualizar/${id}`);
  }

  getDetalleAlimentar(id: string) {
    return this.http.get(`${this.urlDetalle}/alimentar/${id}`);
  }
}
