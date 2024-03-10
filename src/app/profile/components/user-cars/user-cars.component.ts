import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CarList } from 'src/app/cars/models/car';
import { CarsService } from 'src/app/cars/services/cars.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-cars',
  templateUrl: './user-cars.component.html',
  styleUrls: ['./user-cars.component.css']
})
export class UserCarsComponent implements OnInit {

  loggedUserId: number = 0;

  cars: CarList[] = [];
  carsfilter: string = "";

  constructor(
    private carsService: CarsService,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getCars(){
    this.carsService.getCarsByUser(this.loggedUserId)
      .subscribe(cars => {
        console.log({cars})
        this.cars = cars;
      })
  }

  getLoggedUser(){
    this.authService.loggedUser$
      .subscribe(loggedUser => {
        this.getContactId(loggedUser.id);
      })
  }

  getContactId(userId: number){
    this.profileService.getProfileInformationById(userId)
      .subscribe(contac => {
        console.log({contac})
        this.loggedUserId = contac.contactID;
        console.log("contactid" + this.loggedUserId);
        this.getCars();
      })
  }

}
