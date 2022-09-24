import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ReservationsModalComponent } from './components/reservations-modal/reservations-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ReservationsModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReservationsModalComponent
  ]
})
export class SharedModule { }
