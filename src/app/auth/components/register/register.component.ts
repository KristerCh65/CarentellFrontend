import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from '../../models/register-request';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  unsubscribeAll: Subject<void>;

  passwordMatch: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isActive: true,
    });
    this.unsubscribeAll = new Subject();
    this.passwordMatch = true
  }

  ngOnInit(): void {
    this.managePasswordMatch()
    
  }

  managePasswordMatch(){
    this.registerForm.controls.confirmPassword.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          this.checkIfPasswordMatch("password", "confirmPassword")
        }
      )
  }


  checkIfPasswordMatch(password: string, confirmation: string){
    let pass = this.registerForm.get(password)?.value;
    let conf = this.registerForm.get(confirmation)?.value;
    
    console.log(pass)
    if(pass != conf){
      this.passwordMatch = false;
      return;
    }
    this.passwordMatch = true;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  registro(){
    console.log(this.registerForm);
  }

  saveProfile() {
    const registerUser: RegisterRequest = {
      userName: this.registerForm.controls.userName.value,
      password: this.registerForm.controls.password.value,
      isActive: this.registerForm.controls.isActive.value
    };

    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      return;
    }

    console.log(registerUser);
    this.authservice.register(registerUser)
    .pipe(
      finalize(
        () => {
          this.router.navigate(['/profile/details']);
        }
      ),
      takeUntil(this.unsubscribeAll)
    )
    .subscribe(
      {
        next: (res: LoginResponse) => {
          this.toastr.success(`Gracias por unirte, ${res.userName}!`, 'Usuario Creado' );
        },
        error: () => {
          this.toastr.error('No registrado', 'Error al crear usuario');
        }
      }
    )

  }

}

