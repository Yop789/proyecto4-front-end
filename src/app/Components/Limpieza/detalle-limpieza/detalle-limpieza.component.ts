import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LimpiezaService } from '../../../Services/limpieza.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-detalle-limpieza',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-limpieza.component.html',
  styleUrl: './detalle-limpieza.component.scss',
})
export class DetalleLimpiezaComponent {
  data: any;
  id = '';
  detalle: any;
  constructor(
    private sL: LimpiezaService,
    private alert: AlertasService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.getData();
    this.getDetalleLimpieza(this.id);
  }

  getData() {
    this.sL.getLimpieza(this.id).subscribe(
      (d) => {
        this.data = d;
      },
      (err) => {
        this.alert.alertaError('No se encontró información la limpieza');
      }
    );
  }

  getDetalleLimpieza(id: string) {
    this.sL.getDetalleLimpieza(id).subscribe(
      (d) => {
        this.detalle = d;
      },
      (err) => {
        this.alert.alertaError('No se encontró información la limpieza');
      }
    );
  }
}
