import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/cars/models/car';
import { CarsService } from 'src/app/cars/services/cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1
  }

  cars: Car[] = [];

  constructor(
    private carsService: CarsService
  ){}
      
  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carsService.getCars()
      .subscribe(
        res => {
          this.cars = res;
        }
      )
  }
      
}
    