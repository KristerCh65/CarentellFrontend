import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFiltersService {

  private categoriesFilter: BehaviorSubject<number> = new BehaviorSubject(0);
  categoriesFilter$ = this.categoriesFilter.asObservable();

  constructor() { }

  setFilterCategory(categoryId: number){
    this.categoriesFilter.next(categoryId);
  }
}
