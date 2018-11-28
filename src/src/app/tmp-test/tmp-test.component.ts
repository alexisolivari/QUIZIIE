import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {UserInfoModel} from "../models/UserInfoModel.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-tmp-test',
  templateUrl: './tmp-test.component.html',
  styleUrls: ['./tmp-test.component.css']
})
export class TmpTestComponent implements OnInit {

  userList : UserInfoModel[] = [];
  currentUser = "Email: " + firebase.auth().currentUser.email;

  constructor() {
    this.userList = this.getUserList();
  }

  getUserList()
  {
    let l_userList = [];
    let ref = firebase.database().ref("/users");
    ref.orderByChild("email").on("child_added", function(snapshot) {
      console.log("Getting userList: " + snapshot.val().email);
      l_userList.push(snapshot.val());
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


