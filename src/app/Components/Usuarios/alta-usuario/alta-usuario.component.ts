import { AlertasService } from './../../../Services/alertas.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../Services/usuarios.service';
import { Usuarios } from '../../../Models/usuarios';

@Component({
  selector: 'app-alta-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alta-usuario.component.html',
  styleUrl: './alta-usuario.component.scss',
})
export class AltaUsuarioComponent {
  submitted = false;
  roled: any;
  estadosUsuarios: any;

  @ViewChild('nombre')
  nombre!: ElementRef;

  @ViewChild('password')
  password!: ElementRef;

  @ViewChild('apPaterno')
  apPaterno!: ElementRef;

  @ViewChild('rol')
  rol!: ElementRef;

  @ViewChild('apMaterno')
  apMaterno!: ElementRef;

  @ViewChild('edad')
  edad!: ElementRef;

  @ViewChild('telefono')
  telefono!: ElementRef;

  @ViewChild('username')
  username!: ElementRef;

  @ViewChild('estado')
  estado!: ElementRef;

  constructor(
    private serviceUsuario: UsuariosService,
    private alert: AlertasService
  ) {
    this.getDtaDB();
  }

  getDtaDB() {
    this.getRoles();
    this.getEstadoUsuario();
  }
  getRoles() {
    this.serviceUsuario.getRolesUsuarios().subscribe((resp: any) => {
      this.roled = resp;
    });
  }
  getEstadoUsuario() {
    this.serviceUsuario.getEstadosUsuarios().subscribe((resp: any) => {
      this.estadosUsuarios = resp;
    });
  }

  guardar() {
    this.submitted = true;
    const dtaDB: Usuarios = {
      nombre: this.nombre.nativeElement.value,
      password: this.password.nativeElement.value,
      rol: this.rol.nativeElement.value,
      apPaterno: this.apPaterno.nativeElement.value,
      apMaterno: this.apMaterno.nativeElement.value,
      edad: Number(this.edad.nativeElement.value),
      telefono: this.telefono.nativeElement.value,
      username: this.username.nativeElement.value,
      estado: this.estado.nativeElement.value,
    };
    if (this.validarForm()) {
      this.serviceUsuario.createUsuario(dtaDB);
    } else {
      this.alert.alertaError('Formulario inválido');
    }
  }

  validarForm() {
    if (!this.nombre.nativeElement.value) {
      return false;
    }

    if (!this.password.nativeElement.value) {
      return false;
    }

    if (!this.rol.nativeElement.value) {
      return false;
    }

    if (!this.apPaterno.nativeElement.value) {
      return false;
    }

    if (!this.apMaterno.nativeElement.value) {
      return false;
    }

    if (!this.edad.nativeElement.value) {
      return false;
    }

    if (!this.telefono.nativeElement.value) {
      return false;
    }

    if (!this.username.nativeElement.value) {
      return false;
    }

    if (!this.estado.nativeElement.value) {
      return false;
    }

    return true;
  }
}
