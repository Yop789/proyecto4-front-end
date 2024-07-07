import { Component, ElementRef, ViewChild } from '@angular/core';
import { Corral, CorralID } from '../../../Models/corral';
import { CorralesService } from '../../../Services/corrales.service';
import { AlertasService } from '../../../Services/alertas.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-corrales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editar-corrales.component.html',
  styleUrl: './editar-corrales.component.scss',
})
export class EditarCorralesComponent {
  tipoAnimales: any;
  tipoCorralSulo: any;
  tipoCorralValla: any;
  tipoCoralEstatus: any;
  submitted = false;
  id = '';
  data: any;

  @ViewChild('tipo') tipo!: ElementRef;
  @ViewChild('tamano') tamano!: ElementRef;
  @ViewChild('capacidad') capacidad!: ElementRef;
  @ViewChild('ubicacion') ubicacion!: ElementRef;
  @ViewChild('estatus') estatus!: ElementRef;
  @ViewChild('categoriaValla') categoriaValla!: ElementRef;
  @ViewChild('tipoAnimal') tipoAnimal!: ElementRef;

  constructor(
    private servceCorrales: CorralesService,
    private alert: AlertasService,
    private activateRute: ActivatedRoute
  ) {
    this.id = '' + this.activateRute.snapshot.paramMap.get('id');
    this.getSelect();
    this.getCorralById();
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

  editarCorral() {
    this.submitted = true;
    const tipo = this.tipo.nativeElement.value;
    const tamano = this.tamano.nativeElement.value;
    const capacidad = this.capacidad.nativeElement.value;
    const ubicacion = this.ubicacion.nativeElement.value;
    const estatus = this.estatus.nativeElement.value;
    const tipoValla = this.categoriaValla.nativeElement.value;
    const tipoAnimal = this.tipoAnimal.nativeElement.value;
    const cottales: CorralID = {
      id: this.id,
      tipo,
      tamano,
      capacidad,
      ubicacion,
      estatus,
      tipoValla,
      tipoAnimal,
    };

    if (this.validarCampos()) {
      this.servceCorrales.putCorrales(cottales);
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
  getCorralById() {
    this.servceCorrales.getCorralesId(this.id).subscribe((res: any) => {
      this.data = res;
      this.ubicacion.nativeElement.value = res.ubicacion;
      this.capacidad.nativeElement.value = res.capacidad;
      this.tamano.nativeElement.value = res.tamano;
      this.categoriaValla.nativeElement.value = res.tipoValla;
      this.tipoAnimal.nativeElement.value = res.tipoAnimal;
      this.estatus.nativeElement.value = res.estatus;
    });
  }
}
