import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Department } from '../../models/department';
import { Contact } from '../../models/contact';
import { DepartmentsService } from '../../services/departments.service';
import { ProfileService } from '../../services/profile.service';
import { TownshipsService } from '../../services/townships.service';
import { Township } from '../../models/address';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  loggedUserId: number = 0;
  unsubscribeAll: Subject<void> = new Subject();
  profileForm: FormGroup;

  departments: Department[] = [];
  townships: Township[] = [];


  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private deptsService: DepartmentsService,
    private townshipService: TownshipsService
  ) {
    this.profileForm = this.buildForm()
   }

   buildForm(){
    return this.formBuilder.group({
      //birthDate: [''],
      contactId: [0],
      correo: ['', [Validators.email, Validators.required]],
      dni: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [''],
      userId: [0],
      //photoURL: [''],
      address: new FormGroup({
        id: new FormControl(0),
        departmentID: new FormControl('', Validators.required),
        townshipId: new FormControl('', Validators.required),
        neighborhood: new FormControl('', Validators.required),
        references: new FormControl('', Validators.required)
      })
    });
   }

  ngOnInit(): void {
    this.getUserInformation();
    this.getLoggedUser();
    this.getDepartments();
  }

  get direccion() {
    return this.profileForm.get('address') as FormGroup;
  }

  getLoggedUser(){
    this.authService.loggedUser$.subscribe(
      res => {
        this.loggedUserId = res.id;
      }
    )
  }

  getDepartments(){
    this.deptsService.getDeparments().
    subscribe(
      res => {
        this.departments = res;
      }
    )
  }

  getTownshipsByDepto(){
    this.townshipService.getTownshipsByDepartment(parseInt(this.direccion.controls.departmentID.value))
    .subscribe(
      res => { 
        this.townships = res;
      }
    )
  }

  getUserInformation(){
    this.profileService.userInfo$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(
        (res: Contact) => {
          console.log(res);
          this.setUserInformation(res);
        }
      )
  }

  setUserInformation(contact: Contact){
    this.profileForm.patchValue({
      contactId: contact.contactID,
      correo: contact.correo,
      dni: contact.dni,
      name: contact.name,
      lastName: contact.lastName,
      phone: contact.phone,
    })
    this.direccion.patchValue(contact.address ?? contact.address)
  }

  showFormValue(){
    this.profileForm.get('userId')?.setValue(this.loggedUserId);
    console.log(this.profileForm.value);
  }

  saveContact(){
    if(this.profileForm.get('contactId')?.value > 0){
      this.updateContact();
    } else {
      this.createContact();
    }
  }

  createContact(){
    const user: Contact = this.profileForm.value;
    user.userId = this.loggedUserId;
    this.profileService.saveContactInformation(user)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success("Se ha guardado la informacion del usuario", "Usuario creado")
        },
        err => {
          console.log(err);
          this.toastr.error("Ha ocurrido un error", "Error");
        }
      )
  }

  updateContact(){
    const user = this.profileForm.value;
    this.profileService.updateContactInformation(user)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success("Se ha guardado la informacion del usuario", "Usuario modificado")
        },
        err => {
          console.log(err);
          this.toastr.error("Ha ocurrido un error", "Error");
        }
      )
  }


  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }




}
