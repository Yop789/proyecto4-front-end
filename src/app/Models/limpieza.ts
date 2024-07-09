export interface Limpieza {
  id_limpiador: string;
  id_corral: string;
  fecha: Date;
  fechaFin: Date;
  estado: boolean;
}
export interface LimpiezaID {
  id: string;
  id_limpiador: string;
  id_corral: string;
  fecha: Date;
  fechaFin: Date;
  estado: boolean;
}

export interface Detalle {
  id_limpieza?: string;
  id_herramienta: string;
  fecha: Date;
  fechaFin: Date;
}

export interface DetalleID {
  id: string;
  id_limpieza: string;
  id_herramienta: string;
  fecha: Date;
  fechaFin: Date;
}

export interface LimpiezaDetalles {
  id_limpiador: string;
  id_corral: string;
  fecha: Date;
  fechaFin: Date;
  estado: boolean;
  herramientas: Detalle[];
}
