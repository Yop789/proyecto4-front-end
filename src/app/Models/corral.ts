//     "id": 3,
//     "tipo": "PASTO",
//     "capacidad": 23,
//     "ubicacion": "Frente al granero rojo",
//     "estatus": "INACTIVO",
//     "tamano": 208,
//     "tipoValla": "VALLA_ALAMBRICA",
//     "tipoAnimal": "BOVINO"
export interface Corral {
  id?: string;
  tipo: string;
  capacidad: number;
  ubicacion: string;
  estatus: string;
  tamano: number;
  tipoValla: string;
  tipoAnimal: string;
}
export interface CorralID {
  id: string;
  tipo: string;
  capacidad: number;
  ubicacion: string;
  estatus: string;
  tamano: number;
  tipoValla: string;
  tipoAnimal: string;
}
