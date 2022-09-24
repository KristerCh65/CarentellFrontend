import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/cars/models/car';

@Component({
  selector: 'app-reservations-modal',
  templateUrl: './reservations-modal.component.html',
  styleUrls: ['./reservations-modal.component.css']
})
export class ReservationsModalComponent implements OnInit {

  @Input() car?: Car;
  @Input() modalId?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
