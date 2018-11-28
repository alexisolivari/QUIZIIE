import {Component, OnChanges, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from "../../services/auth.service";
import {Questions} from "../../models/Questions.model";
import {Subscription} from "rxjs";
import {UserInfoModel} from "../../models/UserInfoModel.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  isAdmin: boolean = false;

  user : UserInfoModel;
  userSubscription: Subscription;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (userAuthService: UserInfoModel) => {
        this.user = userAuthService;
        console.log("EMAIL" + this.user.email)
        if (this.user.email) {
          console.log("ON EST LA 2");
          firebase.auth().onAuthStateChanged(
            (user) => {
              console.log("test1")
              this.authService.getUserInfo();
              console.log("tets2")
              if (user) {
                console.log("log 1", this.user);
                this.isAuth = true;
                if (this.user.isAdmin) {
                  this.isAdmin = true;
                }
                else {
                  this.isAdmin = false;
                }
                console.log(user.email, "log 2");
                console.log(this.isAdmin);
              }
            }
          )
          // this.listOfRandomQuestions = this.generateRandomQuestions(questions, 5);
        }
      }
    );
    this.authService.emitUser();
  }

  onSignOut(){
    this.authService.signOutUser();
    this.isAuth = false;
    this.isAdmin = false;
    this.user.email = "";
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
