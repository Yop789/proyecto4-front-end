import { Component } from '@angular/core';
import { CorralesService } from '../../../Services/corrales.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertasService } from '../../../Services/alertas.service';
import { AnimalesService } from '../../../Services/animales.service';

@Component({
  selector: 'app-detalle-corrales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-corrales.component.html',
  styleUrl: './detalle-corrales.component.scss',
})
export class DetalleCorralesComponent {
  corral: any;
  id = '';
  animales: any;
  constructor(
    private servceCorrales: CorralesService,
    private router: ActivatedRoute,
    private alert: AlertasService,
    private aS: AnimalesService
  ) {
    this.id = this.router.snapshot.params['id'];
    this.getCorralById();
    this.getAnimalsByCorral();
  }

  getCorralById() {
    this.servceCorrales.getCorralesId(this.id).subscribe(
      (res) => {
        this.corral = res;
      },
      (error) => {
        this.alert.alertaErrorUrl(
          '/corrales',
          'No se encontro el corral en la base de datos'
        );
      }
    );
  }
  getAnimalsByCorral() {
    this.aS.getAnimalesByCorral(this.id).subscribe((data) => {
      this.animales = data;
      console.log(this.animales);
    });
  }
}
