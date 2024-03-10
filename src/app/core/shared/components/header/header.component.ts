import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: string = '';
  userId: number = 0;


  searchForm: FormControl = new FormControl("");

  constructor(
    public authService: AuthService,
    public router: Router, 
    private profileService: ProfileService,

  ) { 
    
  }

  ngOnInit(): void {
    this.getLoggedUser();
    console.log(this.authService.isLoggedIn());
  }

  getLoggedUser(){
    this.authService.loggedUser$
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser.username;
        this.userId = loggedUser.id;
        this.loadUserInformation();
      })    


  }

  loadUserInformation(){
    if(this.userId){
      this.profileService.getProfileInformationById(this.userId)
        .subscribe(
          res => {
            console.log({res})
            if(res.messageError == null){
              this.profileService.userInfo.next(res);
            }
          }
        )
    }
  }

  logout(){
    this.authService.logout();
  }

  performSearch(){
    console.log("Buscando");
    console.log(this.searchForm.value);

    const search = this.searchForm.value;

    this.router.navigateByUrl('/cars/cars-search-results', { state: {search: search} })
  }

}
