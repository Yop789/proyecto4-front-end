import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../Services/usuarios.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  data: any;
  constructor(private s: UsuariosService, private alert: AlertasService) {
    this.getDATADB();
  }

  getDATADB() {
    this.getUsuarios();
  }
  eliminar(id: string) {
    this.s.deleteUsuario(id).subscribe(
      (data: any) => {
        if (data) {
          this.alert.alertaInfo('Usuario eliminada');
          this.getUsuarios();
        }
      },
      (error) => {
        this.alert.alertaError(error.error.message);
      }
    );
  }

  getUsuarios() {
    this.s.getUsuarios().subscribe((resp: any) => {
      this.data = resp;
    });
  }
}
