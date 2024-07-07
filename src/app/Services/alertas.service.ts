import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor(private router: Router) {}

  alertaSuccess(url: string, mensaje: string) {
    Swal.fire({
      title: mensaje,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate([url]);
      }
    });
  }

  alertaError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }
  alertaErrorUrl(mensaje: string, url: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate([url]);
      }
    });
  }

  alertaInfo(mensaje: string) {
    Swal.fire({
      icon: 'info',
      text: mensaje,
    });
  }
}
