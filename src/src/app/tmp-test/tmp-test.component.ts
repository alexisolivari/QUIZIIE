import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-tmp-test',
  templateUrl: './tmp-test.component.html',
  styleUrls: ['./tmp-test.component.css']
})
export class TmpTestComponent implements OnInit {

  currentUser = "Email: " + firebase.auth().currentUser.email;
  constructor() { }

  ngOnInit() {
  }

  Test() {
    console.log(this.currentUser);
  }

}
