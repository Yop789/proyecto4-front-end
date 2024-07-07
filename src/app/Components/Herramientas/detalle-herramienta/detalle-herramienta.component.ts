import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Herramientas } from '../../../Models/herramientas';
import { HerramientasService } from '../../../Services/herramientas.service';
import { AlertasService } from '../../../Services/alertas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-herramienta',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-herramienta.component.html',
  styleUrl: './detalle-herramienta.component.scss',
})
export class DetalleHerramientaComponent {
  data: any;
  id = '';
  constructor(
    private serviceHerramienta: HerramientasService,
    private activateRutas: ActivatedRoute,
    private alert: AlertasService
  ) {
    this.id = this.activateRutas.snapshot.params['id'];
    this.getHerraminetaById();
  }

  getHerraminetaById() {
    this.serviceHerramienta.getHerraminetaById(this.id).subscribe(
      (data: any) => {
        this.data = data;
      },
      (error) => {
        this.alert.alertaErrorUrl(
          '/Herramientas',
          'No se encontro el corral en la base de datos'
        );
      }
    );
  }
}
