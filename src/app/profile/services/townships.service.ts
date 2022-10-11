import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Township } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class TownshipsService {

  base_url = environment.api_url + 'township';

  constructor(private http: HttpClient) {  }

  getTownshipsByDepartment(departmentID: any):Observable<Township[]>{
    return this.http.get<Township[]>(this.base_url + '/byDepto/' + departmentID)
  }
}
