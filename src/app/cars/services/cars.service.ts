import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car, CarRequest } from '../models/car';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  api_url = environment.api_url + 'cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.api_url);
  }

  getCarsByCategory(categoryId: any): Observable<Car[]>{
    return this.http.get<Car[]>(this.api_url + "/get-cars-by-category/" + categoryId);
  }

  getCarById(carId: any): Observable<Car>{
    return this.http.get<Car>(this.api_url + "/get-car-by-id/" + carId);
  }

  saveCar(car: FormData){
    return this.http.post(this.api_url + '/create-car', car);
  }
  
}
