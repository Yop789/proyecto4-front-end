import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosID } from '../../../Models/usuarios';
import { AlertasService } from '../../../Services/alertas.service';
import { UsuariosService } from '../../../Services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss',
})
export class EditarUsuarioComponent {
  submitted = false;
  roled: any;
  estadosUsuarios: any;
  id = '';
  data: any;

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
    private s: UsuariosService,
    private alert: AlertasService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.getDtaDB();
  }

  getDtaDB() {
    this.getRoles();
    this.getEstadoUsuario();
    this.getById();
  }
  getRoles() {
    this.s.getRolesUsuarios().subscribe((resp: any) => {
      this.roled = resp;
    });
  }
  getEstadoUsuario() {
    this.s.getEstadosUsuarios().subscribe((resp: any) => {
      this.estadosUsuarios = resp;
    });
  }

  guardar() {
    this.submitted = true;
    const dtaDB: UsuariosID = {
      id: this.id,
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
      this.s.updateUsuario(dtaDB);
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
  getById() {
    this.s.getUsuarioById(this.id).subscribe(
      (resp: any) => {
        this.data = resp;
        this.nombre.nativeElement.value = resp.nombre;
        this.password.nativeElement.value = resp.password;
        this.rol.nativeElement.value = resp.rol;
        this.apPaterno.nativeElement.value = resp.apPaterno;
        this.apMaterno.nativeElement.value = resp.apMaterno;
        this.edad.nativeElement.value = resp.edad;
        this.telefono.nativeElement.value = resp.telefono;
        this.username.nativeElement.value = resp.username;
        this.estado.nativeElement.value = resp.estado;
      },
      (error) => {
        this.alert.alertaErrorUrl(
          '/usuarios',
          'No se encontro el usuario en la base de datos'
        );
      }
    );
  }
}
