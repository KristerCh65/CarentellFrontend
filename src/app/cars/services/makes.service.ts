import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Make } from '../models/make';

@Injectable({
  providedIn: 'root'
})
export class MakesService {

  api_url = environment.api_url + 'makes';

  constructor(private http: HttpClient) { }

  getMakes(): Observable<Make[]>{
    return this.http.get<Make[]>(this.api_url);
  }
}
