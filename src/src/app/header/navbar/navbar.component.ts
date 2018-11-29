import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
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
export class NavbarComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  isAuthSubscription: Subscription;

  isAdmin: boolean = false;
  isAdminSubscription: Subscription;

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
                this.authService.setIsAuth(true);
                if (this.user.isAdmin) {
                  this.authService.setIsAdmin(true);
                }
                else {
                  this.authService.setIsAdmin(false);
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

    this.isAdminSubscription = this.authService.isAdminSubject.subscribe(
      (isAdmin : boolean) => {
        this.isAdmin = isAdmin;
      }
    )
    this.authService.emitIsAdmin();

    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth : boolean) => {
        this.isAuth = isAuth;
      }
    )
    this.authService.emitIsAuth();
  }

  onSignOut(){
    this.authService.signOutUser();
    this.authService.setIsAuth(false);
    this.authService.setIsAdmin(false);
    this.user.email = "";
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
    this.isAuthSubscription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
  }

}
