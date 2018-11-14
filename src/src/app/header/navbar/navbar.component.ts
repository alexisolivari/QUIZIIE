import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user)
        {
          this.isAuth = true;
          if (this.authService.getUserInfo().isAdmin)
          {
            this.isAdmin = true;
          }
          else
          {
            this.isAdmin = false;
          }
        }
        else{
          this.isAdmin = false;
          this.isAuth = false;
        }

      }
    )
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
