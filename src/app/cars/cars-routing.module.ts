import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarsComponent } from './components/cars/cars.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  },
  {
    path: ':categoryId',
    component: CarsComponent
  },
  {
    path: 'car-details/:carId',
    component: CarDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
