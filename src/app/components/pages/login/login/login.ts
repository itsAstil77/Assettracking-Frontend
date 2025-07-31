import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '../../../services/alert/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  loginObj = {
    email: "",
    password: ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  constructor(private alertService: Alert) { }


  onLogin() {
    if (!this.loginObj.email || !this.loginObj.password) {
      this.alertService.showAlert("Please enter email and password", "error");
      return;
    }

    this.http.post("Auth/login", this.loginObj).subscribe({
      next: (res: any) => {
        if (res.message === "OTP sent to email") {
          this.alertService.showAlert(res.message, "success");
          this.router.navigateByUrl("otp");
        } else {
          this.alertService.showAlert(res.message, "error");
        }
      },
      error: (err) => {
        this.alertService.showAlert("Login failed! Check your email & password.", "error");
        console.error(err);
      }
    });
  }





  // navigateToForgotPassword() {
  //   this.router.navigateByUrl("forgot-password");
  // }

  //  Reset OTP
  // onSendResetOTP() {
  //   if (this.forgotPasswordForm.invalid) {
  //     this.alertService.showAlert("Please enter a valid email.");
  //     return;
  //   }

  //   this.isSendingOTP = true;

  //   this.http.post("http://172.16.100.68:5000/api/auth/forgot-password", this.forgotPasswordForm.value)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.alertService.showAlert("OTP sent! Please check your email.");
  //         localStorage.setItem("resetEmail", this.forgotPasswordForm.value.email);
  //         this.router.navigateByUrl("reset-password");
  //         this.isSendingOTP = false;
  //       },
  //       error: (err) => {
  //         this.alertService.showAlert("Failed to send OTP. Try again.", "error");
  //         console.error(err);
  //         this.isSendingOTP = false;
  //       }
  //     });
  // }


}
