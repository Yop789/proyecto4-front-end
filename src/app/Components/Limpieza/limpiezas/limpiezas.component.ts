import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LimpiezaService } from '../../../Services/limpieza.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-limpiezas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './limpiezas.component.html',
  styleUrl: './limpiezas.component.scss',
})
export class LimpiezasComponent {
  data: any;
  constructor(private sl: LimpiezaService, private alert: AlertasService) {
    this.getHistoriaLimpieza();
  }

  getHistoriaLimpieza() {
    this.sl.getLimpiezas().subscribe((res) => {
      this.data = res;
    });
  }

  actualizar(id: string) {
    this.sl.updateLimpieza(id).subscribe(
      (res) => {
        if (res) {
          this.getHistoriaLimpieza();
          this.alert.alertaInfo('Tarea Limpieza Terminada');
        }
      },
      (err) => {
        this.alert.alertaError('No se pudo actualizar la limpieza');
      }
    );
  }
}
