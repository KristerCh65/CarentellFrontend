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

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService
  ) { 
    this.carId = this.route.snapshot.paramMap.get("carId");
  }
  
  ngOnInit(): void {
    this.getCarById();
  }

  getCarById(){
    if(this.carId){
      this.carsService.getCarById(this.carId)
        .subscribe(
          res => {
            console.log("Carro: ", res);
            this.car = res;
          }
        )
    }
  }

}
