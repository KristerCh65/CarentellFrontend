import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: string = '';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.authService.loggedUser$
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser.username;
      })
  }

}
