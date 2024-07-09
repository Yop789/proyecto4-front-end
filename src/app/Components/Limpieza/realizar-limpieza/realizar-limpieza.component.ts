import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CorralesService } from '../../../Services/corrales.service';
import { UsuariosService } from '../../../Services/usuarios.service';
import { HerramientasService } from '../../../Services/herramientas.service';
import { Detalle, Limpieza, LimpiezaDetalles } from '../../../Models/limpieza';
import { DetalleHerramientaComponent } from '../../Herramientas/detalle-herramienta/detalle-herramienta.component';
import { LimpiezaService } from '../../../Services/limpieza.service';

@Component({
  selector: 'app-realizar-limpieza',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './realizar-limpieza.component.html',
  styleUrl: './realizar-limpieza.component.scss',
})
export class RealizarLimpiezaComponent {
  submitted = false;

  corrales: any;

  usuarios: any;

  herramientas: any;

  herramintasLimpieza: any[] = [];

  objet: any;

  @ViewChild('herramienta') herramienta!: any;

  @ViewChild('idUser') idUser!: any;

  @ViewChild('idCorral') idCorral!: any;

  constructor(
    private sC: CorralesService,
    private sU: UsuariosService,
    private sH: HerramientasService,
    private sL: LimpiezaService
  ) {
    this.getDtBD();
  }

  getDtBD() {
    this.getCorrales();
    this.getUsuarios();
    this.getHerramientas();
  }
  guardar() {
    this.submitted = true;
    if (
      this.herramintasLimpieza.length == 0 ||
      this.idUser.nativeElement.value == '-----Selecciona un trabajador-----' ||
      this.idCorral.nativeElement.value == '-----Selecciona un corral-----'
    ) {
      return;
    }
    const detalles: Detalle[] = [];
    for (const item of this.herramintasLimpieza) {
      const detalle: Detalle = {
        id_herramienta: item.id,
        fecha: new Date(),
        fechaFin: new Date(),
      };

      detalles.push(detalle);
    }
    const limpieza: LimpiezaDetalles = {
      id_limpiador: this.idUser.nativeElement.value,
      id_corral: this.idCorral.nativeElement.value,
      fecha: new Date(),
      fechaFin: new Date(),
      estado: true,
      herramientas: detalles,
    };
    this.sL.addLimpieza(limpieza);
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
      console.log(this.herramintasLimpieza);
    } else {
      console.log('Herramienta no encontrada');
    }
  }
}
