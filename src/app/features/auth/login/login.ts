import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  
  loading: boolean = false;
  errorMsg: string = "";


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  login(){

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.http.post<any>(
      'https://freeapi.miniprojectideas.com/api/FlightBooking/Login',
      this.loginForm.value
    ).subscribe({
      next: (res)=>{
        this.loading = false;

        if(res.result){
          this.authService.setUser(res.data);
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));


          alert("Login Success 🔥");
          if(res.data.email === 'admin@air.com'){
         this.router.navigateByUrl('/admin');
            }else{
            this.router.navigateByUrl('/dashboard');
          }
        }else{
          this.errorMsg = "Invalid credentials";
        }
      },
      error: ()=>{
        this.loading = false;
        this.errorMsg = "Server error";
      }
    })
  }
}



