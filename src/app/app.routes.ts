import { DetalleCorralesComponent } from './Components/Corrales/detalle-corrales/detalle-corrales.component';
import { Routes } from '@angular/router';
import { ComidaComponent } from './Components/Comidas/comida/comida.component';

import { EditarComidaComponent } from './Components/Comidas/editar-comida/editar-comida.component';
import { DetalleComidaComponent } from './Components/Comidas/detalle-comida/detalle-comida.component';
import { AgregarComidaComponent } from './Components/Comidas/agregar-comida/agregar-comida.component';
import { CorralesComponent } from './Components/Corrales/corrales/corrales.component';
import { AgregarCorralesComponent } from './Components/Corrales/agregar-corrales/agregar-corrales.component';
import { EditarCorralesComponent } from './Components/Corrales/editar-corrales/editar-corrales.component';
import { HerramientasComponent } from './Components/Herramientas/herramientas/herramientas.component';
import { AgregarHerramientasComponent } from './Components/Herramientas/agregar-herramientas/agregar-herramientas.component';
import { DetalleHerramientaComponent } from './Components/Herramientas/detalle-herramienta/detalle-herramienta.component';
import { EditarHerramientaComponent } from './Components/Herramientas/editar-herramienta/editar-herramienta.component';
import { UsuariosComponent } from './Components/Usuarios/usuarios/usuarios.component';
import { AltaUsuarioComponent } from './Components/Usuarios/alta-usuario/alta-usuario.component';
import { DetalleUsuarioComponent } from './Components/Usuarios/detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './Components/Usuarios/editar-usuario/editar-usuario.component';
import { AnimalesComponent } from './Components/Animales/animales/animales.component';
import { AgregarAnimalComponent } from './Components/Animales/agregar-animal/agregar-animal.component';
import { DetalleAnimalComponent } from './Components/Animales/detalle-animal/detalle-animal.component';
import { EditarAnimalComponent } from './Components/Animales/editar-animal/editar-animal.component';
import { LimpiezasComponent } from './Components/Limpieza/limpiezas/limpiezas.component';
import { RealizarLimpiezaComponent } from './Components/Limpieza/realizar-limpieza/realizar-limpieza.component';
import { DetalleLimpiezaComponent } from './Components/Limpieza/detalle-limpieza/detalle-limpieza.component';
import { AlimentarComponent } from './Components/Alimentar/alimentar/alimentar.component';
import { RealizarAlimentacionComponent } from './Components/Alimentar/realizar-alimentacion/realizar-alimentacion.component';
import { DetalleAlimmentarComponent } from './Components/Alimentar/detalle-alimmentar/detalle-alimmentar.component';

export const routes: Routes = [
  {
    path: 'comidas',
    component: ComidaComponent,
  },
  {
    path: 'agregar-comida',
    component: AgregarComidaComponent,
  },
  {
    path: 'edit-comida/:id',
    component: EditarComidaComponent,
  },
  {
    path: 'detalle-comida/:id',
    component: DetalleComidaComponent,
  },
  {
    path: 'corrales',
    component: CorralesComponent,
  },
  {
    path: 'agregar-corral',
    component: AgregarCorralesComponent,
  },
  {
    path: 'edit-corral/:id',
    component: EditarCorralesComponent,
  },
  {
    path: 'detalle-corral/:id',
    component: DetalleCorralesComponent,
  },
  {
    path: 'herramientas',
    component: HerramientasComponent,
  },
  {
    path: 'agregar-herramienta',
    component: AgregarHerramientasComponent,
  },
  {
    path: 'detalle-herramienta/:id',
    component: DetalleHerramientaComponent,
  },
  {
    path: 'edit-herramienta/:id',
    component: EditarHerramientaComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'agregar-usuario',
    component: AltaUsuarioComponent,
  },
  {
    path: 'detalle-usuario/:id',
    component: DetalleUsuarioComponent,
  },
  {
    path: 'edit-usuario/:id',
    component: EditarUsuarioComponent,
  },
  {
    path: 'animales',
    component: AnimalesComponent,
  },
  {
    path: 'agregar-animal',
    component: AgregarAnimalComponent,
  },
  {
    path: 'detalle-animal/:id',
    component: DetalleAnimalComponent,
  },
  {
    path: 'edit-animal/:id',
    component: EditarAnimalComponent,
  },
  {
    path: 'limpiezas',
    component: LimpiezasComponent,
  },
  {
    path: 'agregar-limpieza',
    component: RealizarLimpiezaComponent,
  },
  {
    path: 'detalle-limpieza/:id',
    component: DetalleLimpiezaComponent,
  },
  {
    path: 'alimentar',
    component: AlimentarComponent,
  },
  {
    path: 'agregar-alimentar',
    component: RealizarAlimentacionComponent,
  },
  {
    path: 'detalle-alimentar/:id',
    component: DetalleAlimmentarComponent,
  },
  {
    path: '',
    redirectTo: '/usuarios',
    pathMatch: 'full',
  },
];
