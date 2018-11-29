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

  questionHash(question : Questions) {
    let hash = 0, i, chr;
    if ((question.question + question.goodAnswer).length === 0) return hash;
    for (i = 0; i < (question.question + question.goodAnswer).length; i++) {
      chr   = (question.question + question.goodAnswer).charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  getQuestionsFromUsers() {
    let l_questionList = [];
    let uid = firebase.auth().currentUser.uid;
    console.log("Getting question list for " + "/users/"+uid+"/questions");
    firebase.database().ref("/users/"+uid+"/questions").orderByChild("question").on("child_added", function(snapshot)
    {
      console.log("Getting questionList: " + snapshot.val().question);
      l_questionList.push(snapshot.val());
    })
    return l_questionList;
  }

  emitNote(){
    this.noteSubject.next(this.note);
  }

  emitNumberOfAnswerdQuestion(){
    this.numberOfAnswerdQuestionSubject.next(this.numberOfAnswerdQuestion);
  }

  saveQuestions() {
    if (this.questions != []) {
      for (let question of this.questions) {
        question.success = 'noAnswer';
      }
      firebase.database().ref('/questions').set(this.questions);
      console.log("Question ajoutée: " + this.questions.toString() + "|");
    }
  }

  getQuestions() {
    firebase.database().ref('/questions').on('value', (data) => {
      console.log(data);
      this.questions = data.val() ? data.val() : [];
      this.emitQuestions();
    });
    console.log("Getting question:" + this.questions);
  }

  getSingleQuestions(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/questions/' + id).once('value').then( (data)=> {
            let jpp = data.val();
            let question : Questions = new Questions("", [], "");
            question.goodAnswer = jpp.goodAnswer;
            question.question = jpp.question;
            question.answers = jpp.answers;
            question.success = jpp.success;
            resolve(question);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  resetNoteAndQuestionAnswerd() {
    this.note = 0;
    this.numberOfAnswerdQuestion = 0;
    for(let question of this.questions){
      question.success = "noAnswer";
    }
    this.emitQuestions();
    this.emitNumberOfAnswerdQuestion();
    this.emitNote();
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
    console.log(this.questions);
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
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("/users/" + uid + "/questions/" + this.questionHash(question)).set(question);
    console.log("Path to add question: /users/" + uid + "/questions/" + this.questionHash(question));

    return buttonColor;
  }

}
