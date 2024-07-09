import { Detalle } from './limpieza';
export interface Alimentar {
  id_alimentador: string;
  id_comida: string;
  cantidad: number;
  id_corral: string;
  fecha: Date;
  fechaFinal: Date;
  estado: boolean;
}

export interface AlimentarID {
  id: string;
  id_alimentador: string;
  id_comida: string;
  cantidad: number;
  id_corral: string;
  fecha: Date;
  fechaFinal: Date;
  estado: boolean;
}

export interface DetalleAlimentar {
  id_alimetacion: string;

  id_herramienta: string;

  fecha: Date;

  fechaFin: Date;
}

export interface AlimentarDetalles {
  id_alimentador: string;
  id_comida: string;
  cantidad: number;
  id_corral: string;
  fecha: Date;
  fechaFinal: Date;
  estado: boolean;
  herramientas: Detalle[];
}
