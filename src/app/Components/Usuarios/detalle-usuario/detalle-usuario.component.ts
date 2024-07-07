import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../Services/usuarios.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.scss',
})
export class DetalleUsuarioComponent {
  data: any;

  id = '';

  constructor(
    private s: UsuariosService,
    private activeRoute: ActivatedRoute,
    private alert: AlertasService
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getById();
  }

  getById() {
    this.s.getUsuarioById(this.id).subscribe(
      (data: any) => {
        this.data = data;
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
