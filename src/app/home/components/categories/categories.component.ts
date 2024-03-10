import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/cars/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = [
    {
      categoryId: 1,
      description: "Pick Up",
      imageURL: "assets/images/land-cruiser-pickup.png"
    },
    {
      categoryId: 2,
      description: "Sedan",
      imageURL: "assets/images/virtus-sedan-volkswagen.png"
    },
    {
      categoryId: 3,
      description: "SUV",
      imageURL: "assets/images/swp_1.png"
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showCarsList(id: number){
    this.router.navigate(["/cars/cars-list/" + id]);
  }


}
