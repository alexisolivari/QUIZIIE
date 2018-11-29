import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {UserInfoModel} from "../models/UserInfoModel.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-gererUtilisateur',
  templateUrl: './gererUtilisateur.component.html',
  styleUrls: ['./gererUtilisateur.component.css']
})
export class GererUtilisateurComponent implements OnInit {

  userList : UserInfoModel[] = [];
  currentUser = "Email: " + firebase.auth().currentUser.email;

  constructor() {
    this.userList = this.getUserList();
  }

  getUserList()
  {
    let l_userList = [];
    let user = null;
    let ref = firebase.database().ref("/users");
    ref.orderByChild("email").on("child_added", function(snapshot) {
      console.log("Getting userList: " + snapshot.val().email);
      user = new UserInfoModel(snapshot.val().email, snapshot.val().isAdmin.toString()==="true", snapshot.val().uid);
      console.log(user.email + "   " + user.isAdmin)
      l_userList.push(user);
    })
    return l_userList;
  }

  upgradeStatus(user : UserInfoModel)
  {
    firebase.database().ref("/users/" + user.uid + "/isAdmin").set("true");
    this.userList = this.getUserList();
  }

  downgradeStatus(user : UserInfoModel)
  {
    firebase.database().ref("/users/" + user.uid + "/isAdmin").set("false");
    this.userList = this.getUserList();
  }

  ngOnInit() {
  }

}


