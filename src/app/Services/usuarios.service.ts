import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = environment.url + 'users';
  constructor(private http: HttpClient, private alert: AlertasService) {}

  getUsuarios() {
    return this.http.get(this.url);
  }

  getUsuarioById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  deleteUsuario(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  updateUsuario(data: any) {
    return this.http.put(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/usuarios', 'Usuario Actualizada');
        }
      },
      (error) => {
        this.alert.alertaError('Usuario No Actualizo');
      }
    );
  }

  createUsuario(data: any) {
    return this.http.post(this.url, data).subscribe(
      (data) => {
        if (data) {
          this.alert.alertaSuccess('/usuarios', 'Usuario Creado');
        }
      },
      (error) => {
        this.alert.alertaError('Usuario No Creado');
      }
    );
  }
  getRolesUsuarios() {
    return this.http.get(`${this.url}/roles`);
  }
  getEstadosUsuarios() {
    return this.http.get(`${this.url}/estatus`);
  }
}
