import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit {

  userId: number = 0;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.authService.loggedUser$.subscribe(
    //   res => {
    //     this.userId = res.id;
    //   }
    // )

    // this.loadUserInformation();
  }

  // loadUserInformation(){
  //   if(this.userId){
  //     this.profileService.getProfileInformationById(this.userId)
  //       .subscribe(
  //         res => {
  //           console.log({res})
  //           if(res.messageError == null){
  //             this.profileService.userInfo.next(res);
  //           }
  //         }
  //       )
  //   }
  // }

}
