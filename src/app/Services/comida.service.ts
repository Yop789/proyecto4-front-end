import { AlertasService } from './alertas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Comida } from '../Models/comida';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  url = environment.url + 'comida';
  urlCategoriComida = environment.url + 'Categoria-Comida';
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getComida() {
    return this.http.get(this.url);
  }

  getComidaId(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  postComida(comida: any) {
    return this.http.post(this.url, comida).subscribe((data) => {
      if (data) {
        this.alert.alertaSuccess('/comidas', 'Comida Creada');
      }
    });
  }

  putComida(comida: Comida) {
    return this.http.put(this.url, comida).subscribe((data) => {
      if (data) {
        this.alert.alertaSuccess('/comidas', 'Comida Actualizada');
      }
    });
  }

  deleteComida(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  getCategoriaComida() {
    return this.http.get(this.urlCategoriComida);
  }
}
