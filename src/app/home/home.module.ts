import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CategoriesComponent } from './components/categories/categories.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductViewComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SlickCarouselModule
  ]
})
export class HomeModule { }
