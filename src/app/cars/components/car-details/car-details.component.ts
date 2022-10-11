import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carId: string | null;

  car?: Car;

  cars: Car[] = [];

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService
  ) {
    this.carId = this.route.snapshot.paramMap.get("carId");
  }

  ngOnInit(): void {
    this.getCarById();

  }

  getCarById() {
    if (this.carId) {
      this.carsService.getCarById(this.carId)
        .subscribe(
          car => {
            console.log("Carro: ", car);
            this.car = car;
            this.getCarsByModel();
          }
        )
    }
  }

  getCarsByModel() {
    if(this.car){
      this.carsService.getCarsByModel(this.car?.modelId)
        .subscribe(
          res => { 
            this.cars = res;
          }
        )
    }
  }



}

