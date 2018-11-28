import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {UserInfoModel} from "../models/UserInfoModel.model";
import {Questions} from "../models/Questions.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user : UserInfoModel = null;
  userSubject = new Subject<UserInfoModel>();

  constructor() {
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  setUserInfo(userInfo: UserInfoModel)
  {
    firebase.database().ref("/users/"+userInfo.uid).set(userInfo);
    console.log("New User:" + userInfo.email);
  }

  getUserInfo()
  {



        let i = 0;
        while (!this.user && i < 1) {
          console.log("test")
          console.log("/users/" + firebase.auth().currentUser.uid);
          firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on('value', (data) => {
              console.log("Getting userInfo: " + data.val());
              if (data.val()) {
                this.user = data.val();
                this.emitUser();
                console.log("User email getted: " + this.user.email);
              }
              else {
                console.log("IL EST PAS DANS LA BASE DE DONNEE CE FDP");
              }
            }
          );
          i = i + 1;
        }

  }

  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            let uid =   firebase.auth().currentUser.uid;
            this.setUserInfo(new UserInfoModel(email, false, uid));
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
