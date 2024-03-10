import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ReservationsModalComponent } from './components/reservations-modal/reservations-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsFilterPipe } from '../pipes/cars-filter.pipe';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ReservationsModalComponent,
    LoadingSpinnerComponent,
    CarsFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReservationsModalComponent,
    LoadingSpinnerComponent,
    CarsFilterPipe
  ]
})
export class SharedModule { }
