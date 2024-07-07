import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ComidaComponent } from './Components/comida/comida.component';
import { AgregarComidaComponent } from './Components/agregar-comida/agregar-comida.component';
import { EditarComidaComponent } from './Components/editar-comida/editar-comida.component';
import { DetalleComidaComponent } from './Components/detalle-comida/detalle-comida.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
