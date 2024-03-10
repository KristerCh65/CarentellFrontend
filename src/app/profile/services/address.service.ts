import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  base_url = environment.api_url + "address/"

  constructor(private http: HttpClient) { }

  getAddressByContact(): Observable<Address>{
    return this.http.get<Address>(this.base_url);
  }

}
