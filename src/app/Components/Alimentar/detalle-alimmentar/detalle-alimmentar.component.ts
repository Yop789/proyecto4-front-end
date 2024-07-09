import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlimentarService } from '../../../Services/alimentar.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-detalle-alimmentar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-alimmentar.component.html',
  styleUrl: './detalle-alimmentar.component.scss',
})
export class DetalleAlimmentarComponent {
  data: any;
  detalle: any;
  id = '';
  constructor(
    private s: AlimentarService,
    private alert: AlertasService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.getData();
    this.getDetalleAlimentarId(this.id);
  }

  getData() {
    this.s.getAlimentar(this.id).subscribe(
      (d) => {
        this.data = d;
      },
      (err) => {
        this.alert.alertaError('No se encontró información la limpieza');
      }
    );
  }

  getDetalleAlimentarId(id: string) {
    this.s.getDetalleAlimentar(id).subscribe(
      (d) => {
        this.detalle = d;
      },
      (err) => {
        this.alert.alertaError('No se encontró información la limpieza');
      }
    );
  }
}
