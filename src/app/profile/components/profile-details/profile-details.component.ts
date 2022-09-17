import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../../models/contact';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  unsubscribeAll: Subject<void> = new Subject();
  profileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.buildForm()
   }

   buildForm(){
    return this.formBuilder.group({
      //birthDate: [''],
      correo: ['', [Validators.email, Validators.required]],
      dni: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [''],
      //photoURL: [''],
      address: new FormGroup({
        departmentID: new FormControl('', Validators.required),
        townshipId: new FormControl('', Validators.required),
        neighborhood: new FormControl('', Validators.required),
        references: new FormControl('', Validators.required)
      })
    });
   }

  ngOnInit(): void {
    this.getUserInformation();
  }

  get direccion() {
    return this.profileForm.get('address') as FormGroup;
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
      correo: contact.correo,
      dni: contact.dni,
      name: contact.name,
      lastName: contact.lastName,
      phone: contact.phone,
    })
    this.direccion.patchValue(contact.address)
  }

  showFormValue(){
    console.log(this.profileForm.value);
  }


  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }




}
