import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import * as firebase from "firebase";
import {UserInfoModel} from "../models/UserInfoModel.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{


  constructor(private router: Router, private authService : AuthService) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log("hey")
    return new Promise(
      (resolve, reject) => {
        this.authService.userSubject.subscribe(
          (userAuthService: UserInfoModel) => {
            if (userAuthService.isAdmin) {
              console.log("yes");
              resolve(true);
            }
            else{
              console.log("nop")
              this.router.navigate(['/questions']);
              resolve(false);
            }
          }
        )
        this.authService.emitUser()
      }
    )
  }
}
