import { url } from 'inspector';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { CorralID } from '../Models/corral';

@Injectable({
  providedIn: 'root',
})
export class CorralesService {
  url = `${environment.url}corrales`;
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getCorrales() {
    return this.http.get(`${this.url}`);
  }

  getCorralesId(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  postCorrales(corral: any) {
    return this.http.post(`${this.url}`, corral).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/corrales', 'Corral Creado');
        }
      },
      (error) => {
        this.alert.alertaError('Corral No Creado');
      }
    );
  }

  putCorrales(corral: CorralID) {
    return this.http.put(`${this.url}`, corral).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/corrales', 'Corral Actualizado');
        }
      },
      (error) => {
        this.alert.alertaError('Corral No Actualizado');
      }
    );
  }

  deleteCorrales(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getTipoCorralesCorrales() {
    return this.http.get(`${this.url}/tipos`);
  }

  getTipoCorralesAnimales() {
    return this.http.get(`${this.url}/tipos/animales`);
  }

  getTipoCorralesVallas() {
    return this.http.get(`${this.url}/tipos/Vallas`);
  }

  getEstatusCorrales() {
    return this.http.get(`${this.url}/tipos/estatus`);
  }
  getEspecieCorrales(especie: string) {
    return this.http.get(`${this.url}/especie/${especie}`);
  }
}
