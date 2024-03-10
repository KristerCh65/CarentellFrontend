import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CarsService } from '../../services/cars.service';
import { CategoriesFiltersService } from '../../services/categories-filters-service.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-filters',
  templateUrl: './categories-filters.component.html',
  styleUrls: ['./categories-filters.component.css']
})
export class CategoriesFiltersComponent implements OnInit {

  categories: Category[] = []

  constructor(
    private categoriesService: CategoriesService,
    private categoriesFilterService: CategoriesFiltersService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getCategories()
      .subscribe(
        res => {
          this.categories = res;
        }
      )
  }

  onInputChange(event: any){
    console.log(event.target.value);
    this.categoriesFilterService.setFilterCategory(event.target.value);
  }

}
