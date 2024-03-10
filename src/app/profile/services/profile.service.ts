import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'src/app/subscriptions/models/subscription';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  base_url = environment.api_url + 'contacts';

  userInfo = new BehaviorSubject<Contact>({
    contactID: 0,
    birthDate: new Date(),
    correo: '',
    dni: '',
    name: '',
    lastName: '',
    phone: '',
    photoURL: '',
    address: {
      addressID: 0,
      departmentId: 0,
      townshipId: 0,
      neighborhood: '',
      references: ''
    },
    userId: 0,
    messageError: '',
    socialMedia: []
  });

  userInfo$ = this.userInfo.asObservable();

  userCurrentSubscription = new BehaviorSubject<Subscription>({
    id: 0,
    typeSubscriptionId: 0,
    typeSubscription: {
      typeSubscryptionID: 0,
      description: '',
      quantityDays: 0,
      priority: 0,
      price: 0,
      comentaries: ''
    },
    userId: 0,
    user: {
      id: 0,
      username: '',
      active: false
    },
    activationDate: new Date(),
    terminationDate: new Date(),
    active: false,
    messageError: ''
  });

  userCurrentSubscription$ = this.userCurrentSubscription.asObservable();

  constructor(private http: HttpClient) { }

  getProfileInformationById(userId: any) : Observable<Contact>{
    return this.http.get<Contact>(this.base_url +"/get-by-user-id/"+ userId);
  }

  getContactById(contactId: any): Observable<Contact>{
    return this.http.get<Contact>(this.base_url + "/get-contact-by-id/" + contactId);
  }

  setUserInfo(user: Contact){
    this.userInfo.next(user);
  }

  saveContactInformation(user: Contact){
    return this.http.post<Contact>(this.base_url, user);
  }

  updateContactInformation(user: Contact){
    return this.http.put<Contact>(this.base_url, user);
  }
}
