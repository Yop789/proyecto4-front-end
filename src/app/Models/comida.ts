export interface Comida {
  id?: string;
  nombre: string;
  descripcion: string;
  disponibilidad: number;
  categoria: string;
  cantidad: number;
  fechaReabasteciendo: Date;
}
