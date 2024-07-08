import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CorralesService } from '../../../Services/corrales.service';
import { CorralID } from '../../../Models/corral';
import { Animales } from '../../../Models/animales';
import { AlertasService } from '../../../Services/alertas.service';
import { AnimalesService } from '../../../Services/animales.service';

@Component({
  selector: 'app-agregar-animal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agregar-animal.component.html',
  styleUrl: './agregar-animal.component.scss',
})
export class AgregarAnimalComponent {
  submitted = false;
  tipoEspecie: any;
  corrales: CorralID[] = [];

  @ViewChild('siniiga')
  siniiga!: ElementRef;

  @ViewChild('especie')
  especie!: ElementRef;

  @ViewChild('genero')
  genero!: ElementRef;

  @ViewChild('peso')
  peso!: ElementRef;

  @ViewChild('altura')
  altura!: ElementRef;

  @ViewChild('color')
  color!: ElementRef;

  @ViewChild('idCorral')
  idCorral!: ElementRef;

  tipoEs = '';
  constructor(
    private sCorral: CorralesService,
    private alert: AlertasService,
    private s: AnimalesService
  ) {
    this.getCorral();
  }

  getEspecie(event: any) {
    const especie = event.target.value;
    if (especie != '-----Selecciona un corral-----') {
      this.tipoEs =
        '' +
        this.corrales.find((obj) => obj.id == event.target.value)?.tipoAnimal;
    } else this.tipoEs = '';
    this.especie.nativeElement.value = this.tipoEs;
  }

  getCorral() {
    return this.sCorral.getCorrales().subscribe((resp: any) => {
      this.corrales = resp;
    });
  }

  guardar() {
    this.submitted = true;
    const d: Animales = {
      siniiga: this.siniiga.nativeElement.value,
      especie: this.especie.nativeElement.value,
      genero: this.genero.nativeElement.value,
      peso: Number(this.peso.nativeElement.value),
      altura: Number(this.altura.nativeElement.value),
      color: this.color.nativeElement.value,
      fechaNacimiento: new Date(),
      idCorral: Number(this.idCorral.nativeElement.value),
    };
    if (this.validarForm()) {
      this.s.createAnimale(d);
    } else {
      this.alert.alertaError('Formulario inválido');
    }
  }
  validarForm() {
    if (!this.siniiga.nativeElement.value) {
      return false;
    }

    if (!this.especie.nativeElement.value) {
      return false;
    }

    if (!this.genero.nativeElement.value) {
      return false;
    }

    if (!this.peso.nativeElement.value) {
      return false;
    }

    if (!this.altura.nativeElement.value) {
      return false;
    }

    if (!this.color.nativeElement.value) {
      return false;
    }

    if (
      !this.idCorral.nativeElement.value &&
      this.idCorral.nativeElement.value == '-----Selecciona un corral-----'
    ) {
      return false;
    }
    return true;
  }
}
