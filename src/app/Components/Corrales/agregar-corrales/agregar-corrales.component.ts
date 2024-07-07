import {
  asNativeElements,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CorralesService } from '../../../Services/corrales.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Corral } from '../../../Models/corral';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-agregar-corrales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agregar-corrales.component.html',
  styleUrl: './agregar-corrales.component.scss',
})
export class AgregarCorralesComponent {
  tipoAnimales: any;
  tipoCorralSulo: any;
  tipoCorralValla: any;
  tipoCoralEstatus: any;
  submitted = false;

  @ViewChild('tipo') tipo!: ElementRef;
  @ViewChild('tamano') tamano!: ElementRef;
  @ViewChild('capacidad') capacidad!: ElementRef;
  @ViewChild('ubicacion') ubicacion!: ElementRef;
  @ViewChild('estatus') estatus!: ElementRef;
  @ViewChild('categoriaValla') categoriaValla!: ElementRef;
  @ViewChild('tipoAnimal') tipoAnimal!: ElementRef;

  constructor(
    private servceCorrales: CorralesService,
    private alert: AlertasService
  ) {
    this.getSelect();
  }

  getTipoCorral() {
    this.servceCorrales.getEstatusCorrales().subscribe((res) => {
      this.tipoCoralEstatus = res;
    });
  }

  getTipoCorralSulo() {
    this.servceCorrales.getTipoCorralesCorrales().subscribe((res) => {
      this.tipoCorralSulo = res;
    });
  }

  getTipoCorralValla() {
    this.servceCorrales.getTipoCorralesVallas().subscribe((res) => {
      this.tipoCorralValla = res;
    });
  }

  getTipoEspecie() {
    this.servceCorrales.getTipoCorralesAnimales().subscribe((res) => {
      this.tipoAnimales = res;
    });
  }

  getSelect() {
    this.getTipoCorral();
    this.getTipoCorralSulo();
    this.getTipoCorralValla();
    this.getTipoEspecie();
  }

  agregarCorral() {
    this.submitted = true;
    const tipo = this.tipo.nativeElement.value;
    const tamano = this.tamano.nativeElement.value;
    const capacidad = this.capacidad.nativeElement.value;
    const ubicacion = this.ubicacion.nativeElement.value;
    const estatus = this.estatus.nativeElement.value;
    const tipoValla = this.categoriaValla.nativeElement.value;
    const tipoAnimal = this.tipoAnimal.nativeElement.value;
    const cottales: Corral = {
      tipo,
      tamano,
      capacidad,
      ubicacion,
      estatus,
      tipoValla,
      tipoAnimal,
    };

    if (this.validarCampos()) {
      this.servceCorrales.postCorrales(cottales);
    } else {
      this.alert.alertaError('Formulario inválido');
    }
  }

  validarCampos(): boolean {
    if (!this.ubicacion.nativeElement.value) {
      return false;
    }
    if (!this.capacidad.nativeElement.value) {
      return false;
    }
    if (!this.tamano.nativeElement.value) {
      return false;
    }
    if (!this.categoriaValla.nativeElement.value) {
      return false;
    }
    if (!this.tipoAnimal.nativeElement.value) {
      return false;
    }
    if (!this.estatus.nativeElement.value) {
      return false;
    }
    if (!this.tipo.nativeElement.value) {
      return false;
    }
    return true;
  }
}
