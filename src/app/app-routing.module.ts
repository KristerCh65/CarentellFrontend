import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: 'cars',
    loadChildren: () => import("./cars/cars.module").then(m => m.CarsModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import("./reservations/reservations.module").then(m => m.ReservationsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
