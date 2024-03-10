import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth-request';
import { RegisterRequest } from '../models/register-request';
import { AuthUser } from '../models/auth-user';
import { LoginResponse } from '../models/login-response';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = environment.api_url + 'auth';
  auth_url = '/login'
  register_url = '/register'

  loggedUser = new BehaviorSubject<AuthUser>({
    id: 0,
    username: '',
    active: false
  });

  loggedUser$ = this.loggedUser.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    if(localStorage.getItem('token')){
      this.setLoggedUser();
    }
  }

  register(user: RegisterRequest){
    return this.http.post<LoginResponse>(this.base_url + this.register_url, user)
  }

  login(user: AuthRequest){
    return this.http.post<LoginResponse>(this.base_url + this.auth_url, user);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.resetLoggedUser();
    this.router.navigate(['/home'])
  }

  setLoggedUser(){
    const token = localStorage.getItem('token');
    const user: any = jwtDecode(token ?? '');
    const luser: AuthUser = {
      username: user.unique_name ?? '',
      id: user.nameid ?? 0,
      active: true
    }
    this.loggedUser.next(luser);
  }

  resetLoggedUser(){
    this.loggedUser.next({
      id: 0,
      username: '',
      active: false
    });
  }

}
