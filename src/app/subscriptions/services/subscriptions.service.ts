import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from '../models/subscription';
// import { Subscription } from '../models/subscription';
import { SubscriptionRequest } from '../models/subscription-request';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  base_url = environment.api_url + 'subscriptions';

  constructor(private http: HttpClient) { }

  createSubscription(subscription: SubscriptionRequest): Observable<Subscription>{
    return this.http.post<Subscription>(this.base_url, subscription);
  }
  
}
