import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {

  @Input() car?: Car;

  constructor(
    private router: Router
  ) { 
  }

  ngOnInit(): void {
  }

  getFirstPicture(car?: Car){
    return car?.photos[0].photoURL;
  }

  viewDetails(id?: number){
    this.router.navigate(["/cars/car-details", id]);
  }

  

}
