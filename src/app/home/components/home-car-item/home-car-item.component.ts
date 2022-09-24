import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/cars/models/car';

@Component({
  selector: 'app-home-car-item',
  templateUrl: './home-car-item.component.html',
  styleUrls: ['./home-car-item.component.css']
})
export class HomeCarItemComponent implements OnInit {

  @Input() car?: Car;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getFirstPicture(car?: Car){
    return car?.photos[0].photoURL;
  }

  viewDetails(id?: number){
    this.router.navigate(["/cars/car-details/" + id]);
  }


}
