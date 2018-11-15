import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {UserInfoModel} from "../models/UserInfoModel.model";

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor() { }

  setUserInfo(userInfo: UserInfoModel)
  {
    firebase.database().ref("/users/"+userInfo.uid).set(userInfo);
    console.log("New User:" + userInfo.email);
  }

  getUserInfo()
  {
    let user = null;
    firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on('value', (data) => {
      console.log("Getting userInfo: " + data);
      if (data.val())
      {
        user = data.val();
        console.log(user.email);
      }
      else
      {
        console.log("IL EST PAS DANS LA BASE DE DONNEE CE FDP");
      }
    }
    );
    return user;
  }

  getUsersNumber()
  {
    let i = 0;
    firebase.database().ref("/userNumber").on('value', (data) => {
      if (data.val())
      {
        i = data.val();
        console.log("Number of user" + i);
      }
      else
      {
        i = -1;
        console.log("Number of user undefined PD");
      }
    })
    return i;
  };

  incr()
  {
    firebase.database().ref("/userNumber").set(this.getUsersNumber() + 1);
  }



  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            let uid =   firebase.auth().currentUser.uid;
            this.setUserInfo(new UserInfoModel(email, [], false, uid));
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
              let uid =   firebase.auth().currentUser.uid;
              this.setUserInfo(new UserInfoModel(email, [], false, uid));
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
