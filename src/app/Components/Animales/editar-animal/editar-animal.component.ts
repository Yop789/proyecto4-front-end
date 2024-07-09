import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CorralID } from '../../../Models/corral';
import { CommonModule } from '@angular/common';
import { CorralesService } from '../../../Services/corrales.service';
import { AlertasService } from '../../../Services/alertas.service';
import { AnimalesService } from '../../../Services/animales.service';
import { Animales, AnimalesID } from '../../../Models/animales';

@Component({
  selector: 'app-editar-animal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editar-animal.component.html',
  styleUrl: './editar-animal.component.scss',
})
export class EditarAnimalComponent {
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

  id = '';

  data: any;
  constructor(
    private sCorral: CorralesService,
    private alert: AlertasService,
    private s: AnimalesService,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.getDataDB();
  }

  getDataDB() {
    this.getById();
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

  getCorral(e: string) {
    return this.sCorral.getEspecieCorrales(e).subscribe((resp: any) => {
      this.corrales = resp;
    });
  }

  guardar() {
    this.submitted = true;
    const d: AnimalesID = {
      id: this.id,
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
      this.s.updateAnimale(d);
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
  getById() {
    this.s.getAnimaleById(this.id).subscribe((resp: any) => {
      this.getCorral(resp.especie);
      setTimeout(() => {
        this.data = resp;
        this.siniiga.nativeElement.value = resp.siniiga;
        this.especie.nativeElement.value = resp.especie;
        this.genero.nativeElement.value = resp.genero;
        this.peso.nativeElement.value = resp.peso;
        this.altura.nativeElement.value = resp.altura;
        this.color.nativeElement.value = resp.color;
        this.idCorral.nativeElement.value = resp.corral.id;
      }, 1000);
    });
  }
}
