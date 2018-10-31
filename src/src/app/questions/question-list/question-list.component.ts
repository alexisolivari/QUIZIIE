import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Questions} from "../../models/Questions.model";
import {Subscription} from "rxjs";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {Alert} from "selenium-webdriver";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AlertComponent} from "../../utilities/alert/alert.component";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  readonly NUMBER_OF_QUESTION = 10;

  questions: Questions[];
  questionsSubscription: Subscription;

  listOfRandomQuestions: Questions[] = [];

  listQuestionClickedId : number[][] = [];

  note: number;
  noteSubscription: Subscription;

  numberOfAnswerdQuestion: number;
  numberOfAnswerdQuestionSubscription: Subscription;

  buttonColor: string = "btn-primary";


  constructor(private questionsService: QuestionsService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.questionsSubscription = this.questionsService.questionsSubject.subscribe(
      (questions: Questions[]) => {
        this.questions = questions
        // this.listOfRandomQuestions = this.generateRandomQuestions(questions, 5);
      }
    );
    this.questionsService.getQuestions();
    this.questionsService.emitQuestions();

    this.noteSubscription = this.questionsService.noteSubject.subscribe(
      (note: number) => {
        this.note = note
      }
    );
    this.questionsService.emitNote();

    this.numberOfAnswerdQuestionSubscription = this.questionsService.numberOfAnswerdQuestionSubject.subscribe(
      (numberOfAnswerdQuestion: number) => {
        this.numberOfAnswerdQuestion = numberOfAnswerdQuestion;
        if (this.numberOfAnswerdQuestion === this.listOfRandomQuestions.length && this.listOfRandomQuestions.length != 0){
          this.displayScore();
        }
      }
    );
    this.questionsService.emitNumberOfAnswerdQuestion();

    this.resetNotAndAnswer();
    this.listOfRandomQuestions = this.generateRandomQuestions(this.questions, this.NUMBER_OF_QUESTION)
  }

  resetNotAndAnswer() {
    this.questionsService.resetNoteAndQuestionAnswerd();
  }

  onNewQuestion() {
    this.router.navigate(['/questions/new']);
    this.resetNotAndAnswer();
    this.questionsService.getQuestions();
  }

  onDeleteQuestion(question: Questions){
    this.questionsService.removeQuestion(question);
    this.resetNotAndAnswer();
    this.questionsService.getQuestions();
  }

  onViewQuestion(id : number){
    this.router.navigate(['/questions/view/' + id]);
    this.resetNotAndAnswer();
  }

  onValidateAnswer(answer: string, question: Questions, indexQuestion : number, indexAnswer : number ) {
    this.buttonColor = this.questionsService.validateAnswer(answer, question);
    this.listQuestionClickedId.push([indexQuestion, indexAnswer]);
    console.log(this.listQuestionClickedId);

  }

  questionAlreadyClicked(listQuestionAnswer: number[]){
    for(let questionAnswer of this.listQuestionClickedId){
      if (questionAnswer[0] === listQuestionAnswer[0] && questionAnswer[1]===listQuestionAnswer[1]){
        return 'oui';
      }
    }
    return 'non';
  }

  displayScore(){
    alert("Votre score est de :" + this.note + "/" + this.numberOfAnswerdQuestion);


  }

  newQuestions(){
    this.resetNotAndAnswer();
    this.listOfRandomQuestions = this.generateRandomQuestions(this.questions, this.NUMBER_OF_QUESTION);
  }

  /* displayScore() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      'top': '0',
      left: '0'
    };

    this.dialog.open(AlertComponent, dialogConfig);
  } */

  randomInt(min, max) {
    return Math.floor(Math.random() * (max-min +1)) +min
  }


  generateRandomQuestions(questionsList : Questions[], numberOfQuestion : number  ){
    let listOfRandomQuestion : Questions[] = [];
    let listOfRandomNumber : number[] = [];
    let randomNumber : number;

    if(numberOfQuestion <= this.questions.length) {
        console.log("Number of question is ok");
    }
    else{
      numberOfQuestion = this.questions.length;
    }
      while (listOfRandomNumber.length < numberOfQuestion) {
        randomNumber = this.randomInt(0, questionsList.length-1);
        console.log(randomNumber, randomNumber in listOfRandomNumber, listOfRandomNumber);

        while (listOfRandomNumber.indexOf(randomNumber) !== -1) {

          randomNumber = this.randomInt(0, questionsList.length-1 );
        }

        listOfRandomNumber.push(randomNumber);
      }

    console.log(listOfRandomNumber);

    for(let index of listOfRandomNumber){
      listOfRandomQuestion.push(questionsList[index]);
      // questionsList.splice(index, 1);
    }

    return listOfRandomQuestion;

  }

  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.numberOfAnswerdQuestionSubscription.unsubscribe();
  }

}
