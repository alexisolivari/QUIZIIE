import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {Questions} from "../../models/Questions.model";
import {AuthService} from "../../services/auth.service";
import { getMatInputUnsupportedTypeError } from '@angular/material';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {

  questionForm: FormGroup;
  goodAnswer = 1;

  user = this.authService.user;


  isAllowed()
  {
    this.authService.getUserInfo();
    console.log("USERIDJPISQJ:",this.user.dateaj.getMinutes);
    console.log(Date.now());
    return (Date.now() - this.user.dateaj > 120000);
  }

  modifydateaj() {
    this.authService.user.dateaj = Date.now();
    this.authService.setUserInfo(this.authService.user);
  }

  constructor(private formBuilder: FormBuilder,
              private questionService: QuestionsService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.goodAnswer = 1;
    this.initForm()

  }

  initForm(){
    this.questionForm = this.formBuilder.group(
      {
        question: ['', Validators.required],
        answer1: ['', Validators.required],
        answer2: ['', Validators.required],
        answer3: ['', Validators.required],
        answer4: ['', Validators.required],
      }
    );
  }

  update(i)
  {
    this.goodAnswer = i;
  }



  onSaveQuestion(){
    const question = this.questionForm.get('question').value;
    let answers: string[] = [];
    answers.push(this.questionForm.get('answer1').value);
    answers.push(this.questionForm.get('answer2').value);
    answers.push(this.questionForm.get('answer3').value);
    answers.push(this.questionForm.get('answer4').value);
    const goodAnswer = answers[this.goodAnswer-1];
    const newQuestion = new Questions(this.authService.user.pseudo, question, answers, goodAnswer, 0);
    this.questionService.createNewQuestion(newQuestion);
    this.modifydateaj();
    this.router.navigate(['/questions/question']);
  }

}
