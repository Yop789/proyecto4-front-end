import { Component } from '@angular/core';
import { ComidaService } from '../../Services/comida.service';
import { Comida } from '../../Models/comida';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertasService } from '../../Services/alertas.service';

@Component({
  selector: 'app-comida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.scss',
})
export class ComidaComponent {
  data: any[] = [];
  constructor(
    private servceComidad: ComidaService,
    private alert: AlertasService
  ) {
    this.getComidas();
  }

  getComidas() {
    return this.servceComidad.getComida().subscribe((data: any) => {
      this.data = data;
    });
  }

  deleteComida(id: string) {
    return this.servceComidad.deleteComida(id).subscribe(
      (data: any) => {
        this.getComidas();
        this.alert.alertaSuccess('/comidas', 'Comida Eliminada');
      },
      (error) => {
        this.alert.alertaError('Comida No Eliminada');
      }
    );
  }
}
