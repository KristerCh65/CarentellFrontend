import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './components/cars/cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarItemComponent } from './components/car-item/car-item.component';
import { CategoriesFiltersComponent } from './components/categories-filters/categories-filters.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { SharedModule } from '../core/shared/shared.module';
import { CarsSearchResultsComponent } from './components/cars-search-results/cars-search-results.component';
import { RentsCarsListComponent } from './components/rents-cars-list/rents-cars-list.component';


@NgModule({
  declarations: [
    CarsComponent,
    CarItemComponent,
    CategoriesFiltersComponent,
    CarDetailsComponent,
    CarsSearchResultsComponent,
    RentsCarsListComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CarsModule { }
