import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  api_url = environment.api_url + "models";

  constructor(private http: HttpClient) { }

  getModelsByMake(makeId: number) : Observable<Model[]>{
    return this.http.get<Model[]>(this.api_url + '/get-models-by-make/' + makeId);
  }
}
