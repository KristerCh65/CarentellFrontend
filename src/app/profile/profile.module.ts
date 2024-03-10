import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ProfileAccountComponent } from './components/profile-account/profile-account.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCarComponent } from './components/add-car/add-car.component';
import { UserCarsComponent } from './components/user-cars/user-cars.component';
import { SharedModule } from '../core/shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ExpiredSubscriptionComponent } from './components/expired-subscription/expired-subscription.component';


@NgModule({
  declarations: [
    ProfileDetailsComponent,
    SideMenuComponent,
    ProfileAccountComponent,
    MainProfileComponent,
    AddCarComponent,
    UserCarsComponent,
    ExpiredSubscriptionComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
