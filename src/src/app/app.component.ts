import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    var config = {
      apiKey: "AIzaSyBeTrRPC8md2Ex_nM7uqR6n4URg4-jdkoM",
      authDomain: "projet-pima.firebaseapp.com",
      databaseURL: "https://projet-pima.firebaseio.com",
      projectId: "project-pima",
      storageBucket: "projet-pima.appspot.com",
      messagingSenderId: "817238222604"
    };
    firebase.initializeApp(config);
  }
}
