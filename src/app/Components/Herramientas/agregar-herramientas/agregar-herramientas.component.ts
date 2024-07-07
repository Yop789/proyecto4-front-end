import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HerramientasService } from '../../../Services/herramientas.service';
import { Herramientas } from '../../../Models/herramientas';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-agregar-herramientas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agregar-herramientas.component.html',
  styleUrl: './agregar-herramientas.component.scss',
})
export class AgregarHerramientasComponent {
  submitted = false;
  tipoHe: any;

  @ViewChild('codigo') codigo!: ElementRef;
  @ViewChild('nombre') nombre!: ElementRef;
  @ViewChild('descripcion') descripcion!: ElementRef;
  @ViewChild('disponibilidad') disponibilidad!: ElementRef;
  @ViewChild('marca') marca!: ElementRef;
  @ViewChild('color') color!: ElementRef;
  @ViewChild('tipoHerramienta') tipoHerramienta!: ElementRef;
  @ViewChild('estado') estado!: ElementRef;
  constructor(
    private serviceHerramienta: HerramientasService,
    private alert: AlertasService
  ) {
    this.getTipoHerramientas();
  }

  getTipoHerramientas() {
    this.serviceHerramienta.getTiposHerramientas().subscribe((tipo: any) => {
      this.tipoHe = tipo;
    });
  }

  guardar() {
    this.submitted = true;
    const herraminta: Herramientas = {
      codigo: this.codigo.nativeElement.value,
      nombre: this.nombre.nativeElement.value,
      descripcion: this.descripcion.nativeElement.value,
      disponibilidad: Number(this.disponibilidad.nativeElement.value),
      marca: this.marca.nativeElement.value,
      color: this.color.nativeElement.value,
      tipoHerramienta: this.tipoHerramienta.nativeElement.value,
      estado: Number(this.estado.nativeElement.value),
    };
    if (this.validarForm()) {
      this.serviceHerramienta.createHerramienta(herraminta);
    } else {
      this.alert.alertaError('Formulario inválido');
    }
  }

  validarForm() {
    if (!this.codigo.nativeElement.value) {
      return false;
    }
    if (!this.nombre.nativeElement.value) {
      return false;
    }
    if (!this.descripcion.nativeElement.value) {
      return false;
    }
    if (!this.disponibilidad.nativeElement.value) {
      return false;
    }
    if (!this.marca.nativeElement.value) {
      return false;
    }
    if (!this.color.nativeElement.value) {
      return false;
    }
    if (!this.tipoHerramienta.nativeElement.value) {
      return false;
    }
    if (!this.estado.nativeElement.value) {
      return false;
    }
    return true;
  }
}
