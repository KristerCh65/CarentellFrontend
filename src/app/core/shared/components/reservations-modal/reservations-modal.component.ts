import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Car } from 'src/app/cars/models/car';
import { Contact } from 'src/app/profile/models/contact';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { Reservation } from 'src/app/reservations/models/reservation';
import { ReservationsService } from 'src/app/reservations/services/reservations.service';

@Component({
  selector: 'app-reservations-modal',
  templateUrl: './reservations-modal.component.html',
  styleUrls: ['./reservations-modal.component.css']
})
export class ReservationsModalComponent implements OnInit {

  @Input() car?: Car;
  @Input() modalId?: string;

  @ViewChild('myModalClose') modalClose: any;


  today = this.calendar.getToday();
  citaForm: FormGroup;

  unsubscribeAll: Subject<void> = new Subject();


  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private profileService: ProfileService,
    private authService: AuthService,
    private reservationsService: ReservationsService,
    private toastr: ToastrService
  ) { 
    this.citaForm = this.buildForm();
  }

  buildForm(){
    return this.formBuilder.group({
      userId: [0],
      date: [new Date()],
      time: [null],
      carId: [0],
      comments: [''],
      userForm: this.buildUserForm()
    })
  }

  get userForm() {
    return this.citaForm.get('userForm') as FormGroup;
  }

  buildUserForm(){
    return this.formBuilder.group({
      userId: [0],
      name: [''],
      lastName: [''],
      userName: [''],
      phone: [''],
      correo: [''],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.profileService.userInfo$
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
    this.getUserName();
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


  crearCita(){
    const reservation: Reservation = this.citaForm.value;
    reservation.visitDate = this.buildDateTime(this.citaForm.get('date')?.value, this.citaForm.get('time')?.value)
    reservation.carId = this.car?.id ?? 0;
    reservation.userId = this.userForm.get('userId')?.value;
    console.log(reservation)
    console.log(this.car)    
    this.reservationsService.createReservation(reservation)
    .subscribe({
      next: (res) => {
        if(res.errorMessage == null){
          this.toastr.success("Se ha reservado una cita para prueba del vehiculo", "Reservado");
          this.modalClose.nativeElement.click();
        }
      }
    })
  }

  buildDateTime(date: NgbDate, time: NgbTime){
    const dateWithTime = new Date(
                                date.year, 
                                date.month - 1, 
                                date.day,
                                time.hour,
                                time.minute
                                )
    
    return dateWithTime;

  }

}
