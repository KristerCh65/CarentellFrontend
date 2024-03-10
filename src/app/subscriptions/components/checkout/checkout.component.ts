import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Township } from 'src/app/profile/models/address';
import { Contact } from 'src/app/profile/models/contact';
import { Department } from 'src/app/profile/models/department';
import { DepartmentsService } from 'src/app/profile/services/departments.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { TownshipsService } from 'src/app/profile/services/townships.service';
import { Subscription } from '../../models/subscription';
import { TypeSubscription } from '../../models/type-subscription';
import { TypeSubscriptionService } from '../../services/typeSubscription.service';
import Swal from 'sweetalert2';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  subscriptionForm: FormGroup;

  userForm: FormGroup;

  departments: Department[] = [];
  townships: Township[] = [];

  typeSubscription?: TypeSubscription;

  unsubscribeAll: Subject<void> = new Subject();

  constructor(
    private typeSubscriptionService: TypeSubscriptionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private deptsService: DepartmentsService,
    private townshipService: TownshipsService,
    private subscriptionService: SubscriptionsService,
    private router: Router
  ) { 
    this.subscriptionForm = this.buildSubscriptionForm();
    this.userForm = this.buildUserForm();
  }

  buildSubscriptionForm(){
    return this.formBuilder.group({
      typeSubscriptionId: [0, [Validators.required]],
      userId: [0, [Validators.required]],
      active: [false, [Validators.required]]
    });
  }

  buildUserForm(){
    return this.formBuilder.group({
      userId: [0],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      address: new FormGroup({
        id: new FormControl(0),
        departmentID: new FormControl('', Validators.required),
        townshipId: new FormControl('', Validators.required),
        neighborhood: new FormControl('', Validators.required),
        references: new FormControl('', Validators.required)
      })
    });
  }

  get direccion() {
    return this.userForm.get('address') as FormGroup;
  }

  ngOnInit(): void {
    this.getTypeSubscriptionId();
    this.getDepartments();
  }

  getTypeSubscriptionId(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getTypeSubscriptionById(id);
    }
  }

  getTypeSubscriptionById(id: any){
    this.typeSubscriptionService.getTypeSubscription(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          console.log(res);
          this.typeSubscription = res;
          this.loadUserInformation();
        }
      )
  }

  loadUserInformation(){
    this.profileService.userInfo$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          this.setUserInfo(res);
        }
      )
  }

  setUserInfo(user: Contact){
    this.userForm.patchValue({
      userId: user.userId,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      correo: user.correo
    })
    this.direccion.patchValue(user.address ?? user.address)
    this.getUserName();
    this.setSubscriptionInfo();
  }

  setSubscriptionInfo(){
    this.subscriptionForm.patchValue({
      typeSubscriptionId: this.typeSubscription?.typeSubscryptionID,
      userId: this.userForm.get('userId')?.value,
      active: true
    })
  }

  getUserName(){
    this.authService.loggedUser$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          this.userForm.get('userName')?.setValue(res.username);
        }
      )
  }

  getDepartments(){
    this.deptsService.getDeparments().
    subscribe(
      res => {
        this.departments = res;
        this.getTownshipsByDepto();
      }
    )
  }

  getTownshipsByDepto(){
    this.townshipService.getTownshipsByDepartment(parseInt(this.direccion.controls.departmentID.value))
    .subscribe(
      res => { 
        console.log('Municipio: ' , res)
        this.townships = res;
      }
    )
  }

  handleComments(str: string){
    let strArr = str.split(',');
    return strArr[0];
  }

  paySubscription(){
    const subscription = this.subscriptionForm.value;
    console.log(subscription);

    this.subscriptionService.createSubscription(subscription)
      .pipe(
        finalize(
          () => {
            this.router.navigate(['/profile/details']);
          }
        )
      )
      .subscribe(
        {
          next: (res: Subscription) => {
            Swal.fire(
              'Payment processed',
              'Your payment was completed!',
              'success'
            )
            this.profileService.userCurrentSubscription.next(res);
            this.router.navigate(['/profile/details']);
          }
        }
      )
    
    
  }


  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
