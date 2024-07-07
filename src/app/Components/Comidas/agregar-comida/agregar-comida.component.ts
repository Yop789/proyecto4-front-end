import { Component, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComidaService } from '../../../Services/comida.service';
import { Comida } from '../../../Models/comida';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-comida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agregar-comida.component.html',
  styleUrl: './agregar-comida.component.scss',
})
export class AgregarComidaComponent {
  @ViewChild('nombre') nombre!: ElementRef;
  @ViewChild('descripcion') descripcion!: ElementRef;
  @ViewChild('categoria') categoria!: ElementRef;
  @ViewChild('cantidad') cantidad!: ElementRef;

  categoriaComida: string[] = [];

  nombreError: boolean = false;
  descripcionError: boolean = false;
  categoriaError: boolean = false;
  cantidadError: boolean = false;

  constructor(private servceComidad: ComidaService) {
    this.getCategoriaComida();
  }

  agregarComida() {
    this.nombreError = false;
    this.descripcionError = false;
    this.categoriaError = false;
    this.cantidadError = false;

    const nombre = this.nombre.nativeElement.value;
    const descripcion = this.descripcion.nativeElement.value;
    const disponibilidad = 1;
    const categoria = this.categoria.nativeElement.value;
    const cantidad = this.cantidad.nativeElement.value;
    const fechaReabasteciendo = new Date();

    if (!nombre) {
      this.nombreError = true;
    }

    if (!descripcion) {
      this.descripcionError = true;
    }

    if (!categoria) {
      this.categoriaError = true;
    }

    if (!cantidad) {
      this.cantidadError = true;
    }

    if (
      this.nombreError ||
      this.descripcionError ||
      this.categoriaError ||
      this.cantidadError
    ) {
      return;
    }

    const comida: Comida = {
      nombre,
      descripcion,
      disponibilidad,
      categoria,
      cantidad,
      fechaReabasteciendo,
    };

    this.servceComidad.postComida(comida);
  }

  getCategoriaComida() {
    this.servceComidad.getCategoriaComida().subscribe((data: any) => {
      this.categoriaComida = data;
    });
  }
}
