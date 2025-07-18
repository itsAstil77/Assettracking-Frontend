// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Alert } from '../../../services/alert/alert';

// @Component({
//   selector: 'app-custom-alert',
//   imports: [CommonModule],
//   templateUrl: './custom-alert.html',
//   styleUrl: './custom-alert.css'
// })
// export class CustomAlert {

//    show = false;
//   message = '';
//   alertType: 'success' | 'error' | 'warning' = 'success';

//   constructor(private alertService: Alert) {
//     this.alertService.alert$.subscribe(({ message, type }) => {
//       this.message = message;
//       this.alertType = type;
//       this.show = true;

//         // Auto-close if type is success
//         if (type === 'success') {
//           setTimeout(() => {
//             this.close();
//           }, 2000); // 2 seconds
//         }
//     });
//   }

//   close() {
//     this.show = false;
//   }

// }
