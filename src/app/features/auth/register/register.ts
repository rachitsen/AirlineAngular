import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  loading=false;
  msg="";

  form = this.fb.group({
    name:['', Validators.required],
    mobileNo:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    city:['', Validators.required],
    address:['', Validators.required],
    password:['',[Validators.required, Validators.minLength(3)]]
  });

  register(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.loading=true;

    this.http.post<any>(
      'https://freeapi.miniprojectideas.com/api/FlightBooking/Register',
      this.form.value
    ).subscribe({
      next:(res)=>{
        this.loading=false;

        if(res.result){
          alert("Account created 🔥 Please login");
          this.router.navigateByUrl('/login');
        }else{
          this.msg=res.message;
        }
      },
      error:()=>{
        this.loading=false;
        this.msg="Server error";
      }
    })
  }
}
