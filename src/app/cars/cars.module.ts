import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './components/cars/cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarItemComponent } from './components/car-item/car-item.component';
import { CategoriesFiltersComponent } from './components/categories-filters/categories-filters.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { SharedModule } from '../core/shared/shared.module';


@NgModule({
  declarations: [
    CarsComponent,
    CarItemComponent,
    CategoriesFiltersComponent,
    CarDetailsComponent
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
