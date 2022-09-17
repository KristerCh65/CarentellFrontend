import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../models/login-response';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.form = this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    return this.formBuilder.group({
      userName: "",
      password: ""
    });
  }

  login(){
    this.authService.login(this.form.value)
        .subscribe({
          next: (res: LoginResponse) => {
            console.log(res);
            localStorage.setItem("token", res.token)
            this.authService.loggedUser.next({
              id: res.id,
              username: res.userName,
              active: true
            });
            this.router.navigate(['/home']);
            this.toastr.success('Hola de nuevo, '+ res.userName , 'Bienvenido');
          },
          error: (err) => console.log(err)
        })
  }

}
