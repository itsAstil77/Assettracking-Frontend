import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '../../../services/alert/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css'
})
export class Otp {


//   otpForm: FormGroup;

//   otpObj: any = {
//     "email": "",
//     "otp": ""
//   };

//   http = inject(HttpClient);
//   router = inject(Router);
//   authType: string = '';
//   isResending: boolean = false;




//   constructor(private fb: FormBuilder, private alertService: Alert) {
//     this.otpForm = this.fb.group({
//       otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
//     });

//     this.loadUserData();
//   }





//   loadUserData() {
//     this.authType = localStorage.getItem('authType') || '';

//     if (this.authType === "forgot-password") {
//       this.otpObj.email = localStorage.getItem('resetEmail');
//     } else {
//       this.otpObj.email = localStorage.getItem('userEmail');
//     }

//   }



//   // ✅ Verify OTP
//   onSubmit() {
//     if (!this.otpObj.email) {
//       return;
//     }


//     const otpInputs = document.querySelectorAll('.otp-box') as NodeListOf<HTMLInputElement>;
//     const otpValue = Array.from(otpInputs).map(input => input.value).join('');

//     if (otpValue.length < 4) {
//       this.alertService.showAlert("OTP must be at least 4 digits.", "error");
//       return;
//     }


//     this.otpObj.otp = otpValue;

//     // ✅ Hardcoded OTP check
//     const hardcodedOTP = "9628";
//     if (otpValue === hardcodedOTP) {
//       this.alertService.showAlert("OTP verified successfully!");
//       this.router.navigateByUrl("dashboard"); // Redirect to dashboard
//     } else {
//       this.alertService.showAlert("Invalid OTP. Please try again.", "error");
//     }


    // this.http.post("Auth/verify-otp", this.otpObj)
    //   .subscribe({
    //     next: (res: any) => {

    //         this.alertService.showAlert(res.message);
    //         this.router.navigateByUrl("dashboard");



    //     },
    //     error: (error: HttpErrorResponse) => {
    //       console.error("OTP Verification Error:", error);
    //       this.alertService.showAlert("Invalid OTP or server error. Try again.", "error");
    //     }
    //   });
 // }


//   moveFocus(event: any, index: number) {
//     const inputElements = document.querySelectorAll('.otp-box') as NodeListOf<HTMLInputElement>;

//     if (event.target.value && index < inputElements.length - 1) {
//       inputElements[index + 1].focus();
//     }
//   }

//   handleBackspace(event: any, index: number) {
//     const inputElements = document.querySelectorAll('.otp-box') as NodeListOf<HTMLInputElement>;

//     if (event.key === "Backspace" && !event.target.value && index > 0) {
//       inputElements[index - 1].focus();
//     }
//   }



//   onResendOTP() {
//     if (!this.otpObj.email) {
//       this.alertService.showAlert("User email is missing!", "error");
//       return;
//     }

//     this.isResending = true;

//     this.http.post("http://172.16.100.68:5000/api/auth/resend-otp", { email: this.otpObj.email })
//       .subscribe({
//         next: (res: any) => {
//           this.alertService.showAlert("OTP resent successfully! Please check your email.");
//           this.isResending = false;
//         },
//         error: (error: HttpErrorResponse) => {
//           console.error("Resend OTP Error:", error);
//           this.alertService.showAlert("Failed to resend OTP. Please try again.", "error");
//           this.isResending = false;
//         }
//       });
//   }

}
