import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'cars',
    loadChildren: () => import("./cars/cars.module").then(m => m.CarsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import("./reservations/reservations.module").then(m => m.ReservationsModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import("./subscriptions/subscriptions.module").then(m => m.SubscriptionsModule)
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
