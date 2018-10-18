import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {Questions} from "../../models/Questions.model";

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {

  questionForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private questionService: QuestionsService,
              private router: Router) { }

  ngOnInit() {
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
        goodAnswer: ['', Validators.required]
      }
    );
  }

  onSaveQuestion(){
    const question = this.questionForm.get('question').value;
    let answers: string[] = [];
    answers.push(this.questionForm.get('answer1').value);
    answers.push(this.questionForm.get('answer2').value);
    answers.push(this.questionForm.get('answer3').value);
    answers.push(this.questionForm.get('answer4').value);
    const goodAnswer = this.questionForm.get('goodAnswer').value;

    const newQuestion = new Questions(question, answers, goodAnswer);
    this.questionService.createNewQuestion(newQuestion);
    this.router.navigate(['/questions/question']);
  }

}
