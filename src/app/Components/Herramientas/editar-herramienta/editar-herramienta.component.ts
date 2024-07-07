import { Component, ElementRef, ViewChild } from '@angular/core';
import { HerramientasService } from '../../../Services/herramientas.service';
import { AlertasService } from '../../../Services/alertas.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Herramientas, HerramientasID } from '../../../Models/herramientas';

@Component({
  selector: 'app-editar-herramienta',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './editar-herramienta.component.html',
  styleUrl: './editar-herramienta.component.scss',
})
export class EditarHerramientaComponent {
  submitted = false;
  datal: any;
  tipoHe: any;
  id = '';
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
    private alert: AlertasService,
    private activateRuta: ActivatedRoute
  ) {
    this.id = '' + this.activateRuta.snapshot.params['id'];
    this.optenerDataDB();
  }

  optenerDataDB() {
    this.getHerraminetaById();
    this.getTipoHerramientas();
  }
  getTipoHerramientas() {
    this.serviceHerramienta.getTiposHerramientas().subscribe((tipo: any) => {
      this.tipoHe = tipo;
    });
  }

  guardar() {
    this.submitted = true;
    const herraminta: HerramientasID = {
      id: this.id,
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
      this.serviceHerramienta.updateHerramienta(herraminta);
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
  getHerraminetaById() {
    this.serviceHerramienta.getHerraminetaById(this.id).subscribe(
      (data: any) => {
        this.datal = data;
        this.codigo.nativeElement.value = data.codigo;
        this.nombre.nativeElement.value = data.nombre;
        this.descripcion.nativeElement.value = data.descripcion;
        this.disponibilidad.nativeElement.value = data.disponibilidad
          ? '1'
          : '0';
        this.marca.nativeElement.value = data.marca;
        this.color.nativeElement.value = data.color;
        this.tipoHerramienta.nativeElement.value = data.tipoHerramienta;
        this.estado.nativeElement.value = data.estado ? '1' : '0';
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
