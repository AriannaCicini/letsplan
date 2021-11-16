// import { Component } from "@angular/core";
// import { NgForm } from "@angular/forms";
// import { Router } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthResponseData, AuthService } from "./auth.service";

// @Component({
//     selector: 'app-auth',
//     templateUrl: './auth.component.html',
//     styleUrls: ['./auth.component.css']
// })

// export class AuthComponent {
// isLoginMode = true;
// isLoading = false;
// error: string = null;

// constructor(private authService: AuthService,
//             private router: Router) {}

// onSwitchMode(){
//     this.isLoginMode = !this.isLoginMode;
// }

// onSubmit(form: NgForm){
// if(!form.valid) {
//     return;
// }
// const email = form.value.email;
// const password = form.value.password;
// let authObs: Observable<AuthResponseData>;
// this.isLoading = true;

// if(this.isLoginMode) {
//     authObs = this.authService.login(email,password);
//     } else {
//         authObs = this.authService.signup(email, password)
//     }
            
// authObs.subscribe(
//     resData => {
//         console.log(resData); 
//         this.isLoading = false;
//         this.router.navigate(['/travel']);
//     },
//     errorMessage => {
//         console.log(errorMessage);
//         this.error = errorMessage;
//         this.isLoading = false;
//     })
// form.reset();
// }

// }

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
 
@Component({
  selector: 'app-login',
  template: `
    <div class='text-center cpntainer-fluid'
         style="width:300px; height:auto;position: relative;margin: 0 auto;">
      <div *ngIf='showerrmsg' class="alert alert-danger text-center">
        <p>{‌{showerrmsg}}</p>
      </div>
      <form novalidate #f="ngForm" (ngSubmit)=sendLogin(f) class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input type="text" id="username" class="form-control fadeIn second" name="username" #username="ngModel"
               [ngModel]="modelusername" placeholder="username" required>
        <div style="color:red" *ngIf="username.invalid && username.touched"><small style="font-size:0.75em">* Il campo
          Username è
          obbligatorio</small></div>
        <input type="password" id="password" class="form-control fadeIn third" name="password" placeholder="password"
               #password="ngModel" [ngModel]="modelpassword" required>
        <div style="color:red" *ngIf="password.invalid && password.touched"><small style="font-size:0.75em">* Il campo
          Password è
          obbligatorio</small></div>
        <div class="checkbox mb-3" style="font-size:0.80em">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label><br/>
          <small>Torna alla <a routerLink=""><span style="color:orangered">Home</span></a></small>
        </div>
        <button [disabled]='f.invalid' class="btn btn-sm btn-warning" type="submit">Sign in</button>
      </form>
    </div>
 
  `,
  styles: [`
    input {
      margin-bottom: 10px;
    }
  `]
})
export class LoginComponent implements OnInit {
  modelpassword: string;
  modelusername: string;
  showerrmsg: string;
 
  sendLogin(form: NgForm) {
    this.auth.login(form)
      .subscribe(res => {
          alert('token passato: ' + res);
          this.router.navigateByUrl('dashboard');
        },
        error => this.showerrmsg = error
      );
  }
 
  constructor(private auth: AuthService, private router: Router) {
  }
 
  ngOnInit(): void {
    this.auth.logout();
  }
 
}