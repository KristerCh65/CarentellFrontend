import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { CalendarComponent } from './components/calendar/calendar.component';


@NgModule({
  declarations: [
    ReservationsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule
  ]
})
export class ReservationsModule { }
