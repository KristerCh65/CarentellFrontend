import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { ProfileAccountComponent } from './components/profile-account/profile-account.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { UserCarsComponent } from './components/user-cars/user-cars.component';

const routes: Routes = [
  {
    path: '',
    component: MainProfileComponent,
    children: [
      {
        path: 'details',
        component: ProfileDetailsComponent
      },
      {
        path: 'account',
        component: ProfileAccountComponent
      },
      {
        path: 'user-cars',
        component: UserCarsComponent
      }
    ]
  },
  {
    path: 'add-car',
    component: AddCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
