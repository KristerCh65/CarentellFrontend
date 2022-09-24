import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
      id: 0,
      departmentId: 0,
      townshipId: 0,
      neighborhood: '',
      references: ''
    },
    socialMedia: []
  });

  userInfo$ = this.userInfo.asObservable();


  constructor(private http: HttpClient) { }

  getProfileInformationById(userId: number) : Observable<Contact>{
    return this.http.get<Contact>(this.base_url +"/get-by-user-id/"+ userId);
  }

  setUserInfo(user: Contact){
    this.userInfo.next(user);
  }
}
