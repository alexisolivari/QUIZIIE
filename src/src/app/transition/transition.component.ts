import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionComponent implements OnInit {

  PseudoForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.PseudoForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{1,}/)]]
    })
  }

  onSubmit() {
    const pseudo = this.PseudoForm.get('pseudo').value;
    let uid = this.authService.user.uid;
    firebase.database().ref("/users/"+uid+"/pseudo/").set(pseudo);
    this.router.navigate(['/questions/question']);
  }
}
