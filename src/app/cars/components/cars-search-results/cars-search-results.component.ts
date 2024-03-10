import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-cars-search-results',
  templateUrl: './cars-search-results.component.html',
  styleUrls: ['./cars-search-results.component.css']
})
export class CarsSearchResultsComponent implements OnInit {

  cars: Car[] = [];

  searchText: string | null;

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.searchText = window.history.state.search;
    this.route.queryParams.pipe(
      map(() => window.history.state)
    ).subscribe(
      result => {
        this.searchText = result.search;
      }
    )
    
  }


  ngOnInit(): void {
    console.log(this.searchText);
    this.getCarsByArguments();
  }

  getCarsByArguments(){
    this.carsService.getCarsByArguments(this.searchText ?? "")
      .subscribe(
        res => {
          console.log("Cars by arguments ", res);
          this.cars = res;
        }
      )
  }
}
