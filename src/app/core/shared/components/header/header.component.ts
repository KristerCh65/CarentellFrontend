import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: string = '';

  searchForm: FormControl;

  constructor(
    public authService: AuthService
  ) { 
    this.searchForm = new FormControl("");
  }

  ngOnInit(): void {
    this.getLoggedUser();
    console.log(this.authService.isLoggedIn());
  }

  getLoggedUser(){
    this.authService.loggedUser$
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser.username;
      })    
  }

  logout(){
    this.authService.logout();
  }

  performSearch(){
    console.log("Buscando");
    console.log(this.searchForm.value);
  }

}
