// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, throwError } from 'rxjs';
// import { User } from './user.module';
// import { Router } from "@angular/router";

// export interface AuthResponseData {
// kind: string;
// idToken: string;
// email: string;
// refreshToken: string;
// expiresIn: string;
// localId: string;
// registered?: boolean;
// }

// @Injectable({providedIn: 'root'})
// export class AuthService {
// user = new BehaviorSubject<User>(null);

// constructor(private http: HttpClient,
//             private router: Router) {}

// signup(email: string, password: string){
//     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVkyHtPpsNJQU7V0s8JrWZHrPMDep6jRQ',
//         {email: email, 
//          password: password, 
//          returnSecureToken: true
//         }
//         ).pipe(catchError(this.handleError), tap(resData => {
//            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
//         })
//     );
// }

// login(email: string, password: string) {
//     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVkyHtPpsNJQU7V0s8JrWZHrPMDep6jRQ',
//         {email: email, 
//          password: password, 
//          returnSecureToken: true
//         }).pipe(catchError(this.handleError), tap(resData => {
//             this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
//         })
//     );
// }

// autoLogin(){
//     const userData: {
//         email: string;
//         id: string;
//         _token: string;
//         _tokenExpirationDate: string;
//     } = JSON.parse(localStorage.getItem('userData'));
//     if (!userData) {
//         return;
//     }  
//     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
//     if (loadedUser.token) {
//         this.user.next(loadedUser);
//     }
// }

// logout(){
//     this.user.next(null);
//     this.router.navigate(['/auth']);
// }
    
// private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
//     const expirationDate = new Date(new Date().getTime() + expiresIn + 1000);
//     const user = new User(email, userId, token, expirationDate);
//     this.user.next(user);
//     localStorage.setItem('userData', JSON.stringify(user));
// }

// private handleError(errorRes: HttpErrorResponse) {
//     let errorMessage = 'Errore';
//     if (!errorRes.error || !errorRes.error.error) {
//         return throwError(errorMessage)
//     }
//     switch(errorRes.error.error.message) {
//         case 'EMAIL_EXISTS':
//             errorMessage = 'E-mail già esistente';
//         break;
//         case 'EMAIL_NOT_FOUND':
//             errorMessage = 'E-mail non esistente';
//         break;
//         case 'INVALID_PASSWORD':
//              errorMessage = 'Password errata';
//         break;
//     }
//     return throwError(errorMessage);
//     };
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  private option: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
 
  constructor(private http: HttpClient) {
    this.url = 'http://localhost/bookServer/auth/';
  }
 
  login(datiform): Observable<string> {
    const body = this.body(datiform);
    return this.http.post(this.url, body, { headers: this.option})
      .pipe(
        map(res => {
          if (res['token']) {
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorhandler)
      );
 
  }
  private setSession(jwt: string) {
    let expired: number = new Date().getTime() + 60000 * 60;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expire', expired.toString());
  }
 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }
 
 
  private body(df: NgForm) {
    let param = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);
    return param;
  }
 
  notExpired(): boolean {
    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire'));
      return new Date().getTime() < expire;
    }
    return false;
  }
 
  checkDir() {
    if ( this.notExpired()) {
      return 'dashboard/';
    }
    return '';
  }
 
 
  /*GESTIONE ERRORI*/
  errorhandler(error: any) {
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = 'Applicazione offline';
      } else {
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }
}