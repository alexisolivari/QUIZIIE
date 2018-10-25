import { Injectable } from '@angular/core';
import {Questions} from "../models/Questions.model";
import {Subject} from "rxjs";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questions: Questions[] = [];
  questionsSubject = new Subject<Questions[]>();

  constructor() {
    this.getQuestions();
  }

  emitQuestions() {
    this.questionsSubject.next(this.questions);
  }

  saveQuestions() {
    for(let question of this.questions){
      question.success = 'noAnswer';
    }
    firebase.database().ref('/questions').set(this.questions);
  }

  getQuestions() {
    firebase.database().ref('/questions').on('value', (data) => {
      this.questions = data.val() ? data.val() : [];
      this.emitQuestions();
    });
    console.log(this.questions)
  }

  getSingleQuestions(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/questions' + id).once('value').then( (data)=> {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewQuestion(newQuestion: Questions){
    this.questions.push(newQuestion);
    this.saveQuestions();
    this.emitQuestions();
  }


  removeQuestion(question: Questions){
    const questionIndexToRemove = this.questions.findIndex(
      (questionEl) => {
        if (questionEl === question){
          return true;
        }
      }
    );
    this.questions.splice(questionIndexToRemove,1);
    this.saveQuestions();
    this.emitQuestions();
  }

  validateAnswer(answer: string, question: Questions) {
    let buttonColor: string = "btn-primary";
    for(let allQuestion of this.questions){
      allQuestion.success = 'noAnswer';
    }
    if(question.goodAnswer === answer ){
      question.success = 'goodAnswer';
      buttonColor = "btn-success";
    }
    else {
      question.success = 'badAnswer';
      buttonColor = "btn-danger";
    }

    this.emitQuestions();

    return buttonColor;


  }

}
