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

  note: number = 0;
  noteSubject = new Subject<number>();

  numberOfAnswerdQuestion: number = 0;
  numberOfAnswerdQuestionSubject = new Subject<number>();

  constructor() {
    this.getQuestions();
  }

  emitQuestions() {
    this.questionsSubject.next(this.questions);
  }

  emitNote(){
    this.noteSubject.next(this.note);
  }

  emitNumberOfAnswerdQuestion(){
    this.numberOfAnswerdQuestionSubject.next(this.numberOfAnswerdQuestion);
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
    /*for(let allQuestion of this.questions){
      allQuestion.success = 'noAnswer';
    } */
    if(question.goodAnswer === answer ){
      question.success = 'goodAnswer';
      buttonColor = "btn-success";
      this.note += 1;
      this.numberOfAnswerdQuestion +=1;
      this.emitNote();
    }
    else {
      question.success = 'badAnswer';
      buttonColor = "btn-danger";
      this.numberOfAnswerdQuestion +=1;
    }

    this.emitNumberOfAnswerdQuestion();
    this.emitQuestions();

    return buttonColor;


  }

}
