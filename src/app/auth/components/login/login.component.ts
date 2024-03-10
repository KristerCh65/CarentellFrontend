import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/profile/services/profile.service';
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
    private toastr: ToastrService,
    private profileService: ProfileService
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
            if(res.message != null){
              this.toastr.error(res.message, "Error");
            } else {
              localStorage.setItem("token", res.token)
              this.authService.loggedUser.next({
                id: res.id,
                username: res.userName,
                active: true
              });
              if(res.subscription.messageError == null){
                this.profileService.userCurrentSubscription.next(res.subscription)
              }
              this.router.navigate(['/home']);
              this.toastr.success('Hola de nuevo, '+ res.userName , 'Bienvenido');
            }
          },
          error: (err) => console.log(err)
        })
  }

}
