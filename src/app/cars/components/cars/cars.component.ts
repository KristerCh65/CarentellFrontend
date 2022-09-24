import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  categoryId: string | null;

  constructor(
    private carsService: CarsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { 
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCarsByCategory(){
    if(this.categoryId){
      this.carsService.getCarsByCategory(this.categoryId)
        .subscribe(
          res => {
            console.log("Cars by category")
            this.cars = res;
          }
        )
    }
  }

  getCarsWithoutFilter(){
    this.carsService.getCars()
      .subscribe(
        res => {
          console.log(res);
          console.log("Cars without filter");
          this.cars = res;
        }
      )
  }

  getCars(){
    if(this.categoryId){
      this.getCarsByCategory();
    } else {
      this.getCarsWithoutFilter();
    }
  }

  sanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}
