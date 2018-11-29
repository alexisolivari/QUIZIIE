import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {UserInfoModel} from "../models/UserInfoModel.model";
import {Questions} from "../models/Questions.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user : UserInfoModel = new UserInfoModel("","epic_fix", null, null);
  userSubject = new Subject<UserInfoModel>();

  isAdmin : boolean = false;
  isAdminSubject = new Subject<Boolean>();

  isAuth : boolean =false;
  isAuthSubject = new Subject<Boolean>();

  constructor() {
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  emitIsAuth() {
    this.isAuthSubject.next(this.isAuth);
  }

  emitIsAdmin() {
    this.isAdminSubject.next(this.isAdmin);
  }

  setIsAuth(boolean : boolean){
    this.isAuth = boolean;
    this.emitIsAuth();
  }

  setIsAdmin(boolean: boolean){
    this.isAdmin = boolean;
    this.emitIsAdmin();
  }

  setUserInfo(userInfo: UserInfoModel)
  {
    firebase.database().ref("/users/"+userInfo.uid).set(userInfo);
    console.log("New User:" + userInfo.email);
  }

  getUserInfo()
  {
      if (firebase.auth().currentUser) {
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on('value', (data) => {
            console.log("Getting userInfo: " + data.val());
            if (data.val()) {
              this.setIsAuth(true);
              let jpp = data.val();
              let previous_user = new UserInfoModel(this.user.pseudo, this.user.email, this.user.isAdmin, this.user.uid);
              console.log("TestAdmin " + (jpp.isAdmin.toString() === "true"));
              console.log("BOOLEAN" + jpp.isAdmin);
              if (jpp.isAdmin.toString() === "true") {
                console.log("ON EST LA");
                previous_user.isAdmin = true;
              }
              else {
                previous_user.isAdmin = false;
              }
              previous_user.email = jpp.email;
              previous_user.uid = jpp.uid;
              previous_user.pseudo = jpp.pseudo;
              if (previous_user.email != this.user.email) {
                this.user = previous_user;
                this.setIsAdmin(previous_user.isAdmin);
                this.emitUser();
              }
              console.log("User email getted: " + this.user.email);
            }
            else {
              console.log("IL EST PAS DANS LA BASE DE DONNEE CE FDP");
              this.user.email = null;
              this.user.isAdmin = null;
              this.user.uid = null;
            }

          }
        );
      }
  }

  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            let uid =   firebase.auth().currentUser.uid;
            this.setUserInfo(new UserInfoModel(null, email, false, uid));
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    )
  }

  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          () => {
            if (this.getUserInfo()===null)
            {
              console.log("User added on Db");
              let uid =   firebase.auth().currentUser.uid;
            }
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    )
  }

  signOutUser(){
    firebase.auth().signOut();
  }
}
