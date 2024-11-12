import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://cafe-management-system-deb4b5hjamamfvdh.northeurope-01.azurewebsites.net/api/Auth/";
  private userPayload:any;

  constructor(public http : HttpClient, private router : Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tvalue){
    localStorage.setItem('token',tvalue.Token);
    localStorage.setItem('id',tvalue.id);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token')
  }

  //for role based auth
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  isAdmin(): boolean{
    const userpayload = this.decodedToken()
      if (userpayload.role.includes('Admin1256')) {
        return true; 
      }
      return false;
  }

}
