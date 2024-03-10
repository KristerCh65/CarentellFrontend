import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarsSearchResultsComponent } from './components/cars-search-results/cars-search-results.component';
import { CarsComponent } from './components/cars/cars.component';
import { RentsCarsListComponent } from './components/rents-cars-list/rents-cars-list.component';

const routes: Routes = [
  {
    path: 'cars-list',
    component: CarsComponent
  },
  {
    path: 'cars-list/:categoryId',
    component: CarsComponent
  },
  {
    path: 'car-details/:carId',
    component: CarDetailsComponent
  },
  {
    path: 'cars-search-results',
    component: CarsSearchResultsComponent
  },
  {
    path: 'rent-cars-list',
    component: RentsCarsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
