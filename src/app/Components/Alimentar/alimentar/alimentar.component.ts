import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlimentarService } from '../../../Services/alimentar.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-alimentar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alimentar.component.html',
  styleUrl: './alimentar.component.scss',
})
export class AlimentarComponent {
  data: any;

  constructor(private s: AlimentarService, private alert: AlertasService) {
    this.getHistoriaAlimentar();
  }
  actualizar(id: number) {
    this.s.updateAlimentar(id).subscribe(
      (res) => {
        this.getHistoriaAlimentar();
        this.alert.alertaInfo('Tarea alimentar Terminada');
      },
      (ero) => {
        this.alert.alertaError('No se pudo actualizar la limpieza');
      }
    );
  }

  getHistoriaAlimentar() {
    this.s.getalimentar().subscribe((res) => {
      this.data = res;
    });
  }
}
