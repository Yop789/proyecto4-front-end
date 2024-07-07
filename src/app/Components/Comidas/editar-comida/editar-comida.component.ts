import { ComidaService } from '../../../Services/comida.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Comida } from '../../../Models/comida';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-editar-comida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editar-comida.component.html',
  styleUrl: './editar-comida.component.scss',
})
export class EditarComidaComponent {
  id = '';
  datal: any;
  @ViewChild('nombre') nombre!: ElementRef;
  @ViewChild('descripcion') descripcion!: ElementRef;
  @ViewChild('categoria') categoria!: ElementRef;
  @ViewChild('cantidad') cantidad!: ElementRef;
  categoriaComida: string[] = [];

  nombreError: boolean = false;
  descripcionError: boolean = false;
  categoriaError: boolean = false;
  cantidadError: boolean = false;

  constructor(
    private servceComidad: ComidaService,
    private activateRuta: ActivatedRoute,
    private alert: AlertasService
  ) {
    this.getCategoriaComida();
    this.id = this.activateRuta.snapshot.params['id'];
    this.getComidaById(this.id);
  }

  editarComida() {
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
      id: this.id,
      nombre,
      descripcion,
      disponibilidad,
      categoria,
      cantidad,
      fechaReabasteciendo,
    };

    this.servceComidad.putComida(comida);
  }

  getCategoriaComida() {
    this.servceComidad.getCategoriaComida().subscribe((data: any) => {
      this.categoriaComida = data;
    });
  }

  getComidaById(id: string) {
    this.servceComidad.getComidaId(id).subscribe(
      (data: any) => {
        this.datal = data;
        this.nombre.nativeElement.value = data.nombre;
        this.descripcion.nativeElement.value = data.descripcion;
        this.categoria.nativeElement.value = data.categoria;
        this.cantidad.nativeElement.value = data.cantidad;
      },
      (error) => {
        this.alert.alertaErrorUrl('Comida no encontrada', '/comidas');
      }
    );
  }
}
