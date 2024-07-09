import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimalesService } from '../../../Services/animales.service';

@Component({
  selector: 'app-detalle-animal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-animal.component.html',
  styleUrl: './detalle-animal.component.scss',
})
export class DetalleAnimalComponent {
  id = '';
  data: any;
  constructor(private s: AnimalesService, private ar: ActivatedRoute) {
    this.id = this.ar.snapshot.params['id'];
    this.getById();
  }

  getById() {
    this.s.getAnimaleById(this.id).subscribe((data) => {
      this.data = data;
    });
  }
}
