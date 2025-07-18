// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// export type AlertType = 'success' | 'error' | 'warning';

// @Injectable({
//   providedIn: 'root'
// })
// export class Alert {

//   constructor() { }

//   private alertSubject = new Subject<{ message: string, type: Alert }>();
//   alert$ = this.alertSubject.asObservable();

//   showAlert(message: string, type: AlertType = 'success') {
//     this.alertSubject.next({ message, type });
//   }
// }


// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// export type AlertType = 'success' | 'error' | 'warning';

// @Injectable({
//   providedIn: 'root'
// })
// export class Alert {
//   private alertSubject = new Subject<{ message: string, type: AlertType }>();
//   alert$ = this.alertSubject.asObservable();

//   showAlert(message: string, type: AlertType = 'success') {
//     this.alertSubject.next({ message, type });
//   }
// }



import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Alert {
   showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    if (type === 'success') {
      Swal.fire({
        icon: 'success',
        text: message,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: type,
        text: message,
        showConfirmButton: true, // Show "OK" button
        confirmButtonText: 'OK'
      });
    }
  }
}
