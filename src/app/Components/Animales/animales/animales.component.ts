import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimalesService } from '../../../Services/animales.service';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.scss',
})
export class AnimalesComponent {
  data: any;
  constructor(private s: AnimalesService) {
    this.getDtaDB();
  }

  eliminar(id: string) {}

  getDtaDB() {
    this.getAnimales();
  }
  getAnimales() {
    this.s.getAnimales().subscribe((resp: any) => {
      this.data = resp;
    });
  }
}
