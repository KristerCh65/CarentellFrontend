import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import {  } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Contact } from 'src/app/profile/models/contact';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  carId: string | null;

  car?: Car;

  contact?: Contact;

  cars: Car[] = [];

  unsubscribeAll: Subject<void> = new Subject();


  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private contactService: ProfileService,
    public authService: AuthService
  ) {
    this.carId = this.route.snapshot.paramMap.get("carId");
  }

  ngOnInit(): void {
    this.getCarById();
    // this.route.params
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe(
    //     params => {
    //       this.carId = params.carId;
    //       this.getCarById();
    //     }
    //   )
  }

  getCarById() {
    if (this.carId) {
      this.carsService.getCarById(this.carId)
        .pipe(
          takeUntil(this.unsubscribeAll)
        )
        .subscribe(
          car => {
            console.log("Carro: ", car);
            this.car = car;
            this.getCarsByModel();
            this.getContactById();
          }
        )
    }
  }

  getContactById(){
    if(this.car){
      this.contactService.getContactById(this.car?.contactId)
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(
        res => {
          this.contact = res;
          console.log("Contacto: ", res)
        }
      )
    }
  }

  getCarsByModel() {
    if(this.car){
      this.carsService.getCarsByModel(this.car?.modelId)
        .pipe(
          takeUntil(this.unsubscribeAll)
        )
        .subscribe(
          res => { 
            this.cars = res.filter(item => {
              return item.id != this.car?.id;
            })
          }
        )
    }
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}

