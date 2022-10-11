import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  base_url = environment.api_url + 'department';

  constructor(private http: HttpClient) { }

  getDeparments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.base_url);
  }
}
