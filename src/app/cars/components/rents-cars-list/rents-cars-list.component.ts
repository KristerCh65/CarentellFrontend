import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';
import { CategoriesFiltersService } from '../../services/categories-filters-service.service';

@Component({
  selector: 'app-rents-cars-list',
  templateUrl: './rents-cars-list.component.html',
  styleUrls: ['./rents-cars-list.component.css']
})
export class RentsCarsListComponent implements OnInit {

  cars: Car[] = [];

  categoryId: string | null;

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private categoriesFiltersService: CategoriesFiltersService
  ) { 
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCarsByCategory(categoryId: number){
    if(this.categoryId){
      this.carsService.getCarsByCategory(categoryId)
        .subscribe(
          res => {
            console.log("Cars by category")
            this.cars = res;
          }
        )
    }
  }

  getByCategory(){
    this.categoriesFiltersService.categoriesFilter$
      .subscribe(
        filters => {
          this.getCarsByCategory(filters);
        }
      )
  }

  getCarsWithoutFilter(){
    this.carsService.getCarsForRent()
      .subscribe(
        res => {
          console.log(res);
          this.cars = res;
        }
      )
  }

  getCars(){
    if(this.categoryId){
      this.getCarsByCategory(parseInt(this.categoryId));
      this.getByCategory();
    } else {
      this.getCarsWithoutFilter();
    }
  }



}
