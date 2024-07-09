import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CorralesService } from '../../../Services/corrales.service';
import { UsuariosService } from '../../../Services/usuarios.service';
import { HerramientasService } from '../../../Services/herramientas.service';
import { AlimentarDetalles, DetalleAlimentar } from '../../../Models/alimentar';
import { AlimentarService } from '../../../Services/alimentar.service';
import { AlertasService } from '../../../Services/alertas.service';
import { ComidaService } from '../../../Services/comida.service';

@Component({
  selector: 'app-realizar-alimentacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './realizar-alimentacion.component.html',
  styleUrl: './realizar-alimentacion.component.scss',
})
export class RealizarAlimentacionComponent {
  submitted = false;

  corrales: any;

  usuarios: any;

  herramientas: any;

  herramintasLimpieza: any[] = [];

  comidas: any;

  objet: any;
  @ViewChild('herramienta') herramienta!: ElementRef;

  @ViewChild('idUser') idUser!: ElementRef;

  @ViewChild('idCorral') idCorral!: ElementRef;
  @ViewChild('idComida') idComida!: ElementRef;
  @ViewChild('cantidad') cantidad!: ElementRef;
  constructor(
    private sC: CorralesService,
    private sU: UsuariosService,
    private sH: HerramientasService,
    private s: AlimentarService,
    private alert: AlertasService,
    private sCO: ComidaService
  ) {
    this.getDtBD();
  }

  getDtBD() {
    this.getCorrales();
    this.getUsuarios();
    this.getHerramientas();
    this.getComidas();
  }

  guardar() {
    this.submitted = true;
    if (
      this.herramintasLimpieza.length == 0 ||
      this.idUser.nativeElement.value == '-----Selecciona un trabajador-----' ||
      this.idCorral.nativeElement.value == '-----Selecciona un corral-----'
    ) {
      this.alert.alertaError('Llena todos los campos');
      return;
    }
    const detalles: DetalleAlimentar[] = [];
    for (const item of this.herramintasLimpieza) {
      const detalle: DetalleAlimentar = {
        id_herramienta: item.id,
        fecha: new Date(),
        fechaFin: new Date(),
      };

      detalles.push(detalle);
    }
    const limpieza: AlimentarDetalles = {
      id_alimentador: this.idUser.nativeElement.value,
      id_corral: this.idCorral.nativeElement.value,
      fecha: new Date(),
      cantidad: this.cantidad.nativeElement.value,
      fechaFinal: new Date(),
      estado: true,
      herramientas: detalles,
      id_comida: this.idComida.nativeElement.value,
    };
    console.log(limpieza);
    this.s.addAlimentar(limpieza);
  }
  getCorrales() {
    this.sC.getCorrales().subscribe((resp) => {
      this.corrales = resp;
    });
  }

  getUsuarios() {
    this.sU.getUsuarios().subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  getComidas() {
    this.sCO.getComida().subscribe((resp: any) => {
      this.comidas = resp;
    });
  }

  getHerramientas() {
    this.sH.getHerramientas().subscribe((resp) => {
      this.herramientas = resp;
    });
  }
  agregarHeramientaArray(event: any): void {
    if (event.target.value == '-----Selecciona una herramienta-----') {
      this.limpiarCajaHerramienta();
      return;
    }
    this.objet = JSON.parse(event.target.value);
  }

  AgregarHerramientas(): void {
    if (!this.objet) {
      alert('Selecciona una herramienta');
      return;
    }

    // Verificar si la herramienta ya existe en la lista
    if (
      this.herramintasLimpieza.some((item) => item.codigo === this.objet.codigo)
    ) {
      alert('La herramienta ya existe en la lista');
      return;
    }

    this.herramintasLimpieza.push(this.objet);
    this.limpiarCajaHerramienta();
  }

  vaciarHerramienta() {
    this.herramintasLimpieza = [];
  }

  limpiarCajaHerramienta() {
    this.objet = null;
    this.herramienta.nativeElement.value =
      '-----Selecciona una herramienta-----';
  }

  eliminarHerramienta(codigo: string): void {
    const index = this.herramintasLimpieza.findIndex(
      (item) => item.codigo === codigo
    );
    if (index > -1) {
      this.herramintasLimpieza.splice(index, 1);
    } else {
      this.alert.alertaInfo('Herramienta no encontrada');
    }
  }
}
