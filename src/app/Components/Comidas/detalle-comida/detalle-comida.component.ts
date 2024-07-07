import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertasService } from '../../../Services/alertas.service';
import { ComidaService } from '../../../Services/comida.service';

@Component({
  selector: 'app-detalle-comida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-comida.component.html',
  styleUrl: './detalle-comida.component.scss',
})
export class DetalleComidaComponent {
  comida: any;
  id = '';
  constructor(
    private servceComidad: ComidaService,
    private alert: AlertasService,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['id'];
    this.getComidaById(this.id);
  }

  getComidaById(id: string) {
    this.servceComidad.getComidaId(id).subscribe(
      (data: any) => {
        this.comida = data;
      },
      (error) => {
        this.alert.alertaErrorUrl('Comida no encontrada', '/comidas');
      }
    );
  }
}
