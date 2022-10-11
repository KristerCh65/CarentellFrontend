import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeSubscription } from '../models/type-subscription';

@Injectable({
  providedIn: 'root'
})

export class TypeSubscriptionService {
  api_url = environment.api_url + 'TypeSubscription';


  constructor(private https: HttpClient) { }

  getTypes(){
    return this.https.get<TypeSubscription[]>(this.api_url);
  }

  getTypeSubscription(typeSubscryptionID: any){
    return this.https.get<TypeSubscription>(this.api_url +"/"+ typeSubscryptionID);
  }
}
