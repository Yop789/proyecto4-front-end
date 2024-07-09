import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimalesService } from '../../../Services/animales.service';
import { AlertasService } from '../../../Services/alertas.service';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.scss',
})
export class AnimalesComponent {
  data: any;
  constructor(private s: AnimalesService, private alert: AlertasService) {
    this.getDtaDB();
  }

  eliminar(id: string) {
    this.s.deleteAnimale(id).subscribe(
      (resp: any) => {
        if (resp) {
          this.alert.alertaInfo('Corral eliminado');
          this.getAnimales();
        }
      },
      (error) => {
        this.alert.alertaError(error.error.message);
      }
    );
  }

  getDtaDB() {
    this.getAnimales();
  }
  getAnimales() {
    this.s.getAnimales().subscribe((resp: any) => {
      this.data = resp;
    });
  }
}
