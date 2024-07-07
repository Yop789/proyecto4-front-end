// "codigo":44352,

//  "nombre":"Tractor",

//  "descripcion":"Tractor color verde y amarillo",

//  "disponibilidad":1,

//  "marca":"John Dear",

//  "color":"Verde-rojo",

//   "tipoHerramienta":"ESPESIFICAS",

//   "estado":1
export interface Herramientas {
  codigo: number;
  nombre: string;
  descripcion: string;
  disponibilidad: number;
  marca: string;
  color: string;
  tipoHerramienta: string;
  estado: number;
}

export interface HerramientasID {
  id: string;
  codigo: number;
  nombre: string;
  descripcion: string;
  disponibilidad: number;
  marca: string;
  color: string;
  tipoHerramienta: string;
  estado: number;
}
