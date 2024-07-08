import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AnimalesService {
  url = environment.url + 'animales';
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getAnimales() {
    return this.http.get(this.url);
  }

  getAnimaleById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  deleteAnimale(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  updateAnimale(data: any) {
    return this.http.put(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/animales', 'Animale Actualizada');
        }
      },
      (error) => {
        this.alert.alertaError('Animale No Actualizo');
      }
    );
  }

  createAnimale(data: any) {
    return this.http.post(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/animales', 'Animale Creado');
        }
      },
      (error) => {
        this.alert.alertaError('Animale No Creado');
      }
    );
  }
  getRolesAnimales() {
    return this.http.get(`${this.url}/roles`);
  }
  getEstadosAnimales() {
    return this.http.get(`${this.url}/estatus`);
  }
}
