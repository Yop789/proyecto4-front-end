import { AlertasService } from './../../../Services/alertas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { HerramientasService } from '../../../Services/herramientas.service';
import { HerramientasID } from '../../../Models/herramientas';

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './herramientas.component.html',
  styleUrl: './herramientas.component.scss',
})
export class HerramientasComponent {
  data: HerramientasID[] = [];
  constructor(
    private serviceHerraminta: HerramientasService,
    private alert: AlertasService
  ) {
    this.getHerramientas();
  }

  getHerramientas() {
    this.serviceHerraminta.getHerramientas().subscribe((data: any) => {
      if (data) {
        this.data = data;
      }
    });
  }
  eliminarHerramienta(id: string) {
    this.serviceHerraminta.deleteHerramienta(id).subscribe(
      (data: any) => {
        if (data) {
          this.alert.alertaInfo('Herramienta eliminada');
          this.getHerramientas();
        }
      },
      (error) => {
        this.alert.alertaError(error.error.message);
      }
    );
  }
}
