import { AlertasService } from './../../../Services/alertas.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Corral } from '../../../Models/corral';
import { CorralesService } from '../../../Services/corrales.service';

@Component({
  selector: 'app-corrales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './corrales.component.html',
  styleUrl: './corrales.component.scss',
})
export class CorralesComponent {
  data: any;
  constructor(
    private serviceCorrales: CorralesService,
    private alert: AlertasService
  ) {
    this.getCorrales();
  }

  getCorrales() {
    return this.serviceCorrales.getCorrales().subscribe((data: any) => {
      this.data = data;
    });
  }

  deleteCorral(id: string) {
    return this.serviceCorrales.deleteCorrales(id).subscribe(
      (data: any) => {
        if (data) {
          this.alert.alertaInfo('Corral eliminado');
          this.getCorrales();
        }
      },
      (error) => {
        this.alert.alertaError(error.error.message);
      }
    );
  }
}
