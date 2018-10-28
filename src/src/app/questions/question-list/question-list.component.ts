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

  questions: Questions[];
  questionsSubscription: Subscription;

  listQuestionClickedId : number[][] = [];

  note: number;
  noteSubscription: Subscription;

  numberOfAnswerdQuestion: number;
  numberOfAnswerdQuestionSubscription: Subscription;

  buttonColor: string = "btn-primary";


  constructor(private questionsService: QuestionsService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.questionsSubscription = this.questionsService.questionsSubject.subscribe(
      (questions: Questions[]) => {
        this.questions = questions
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
        if (this.numberOfAnswerdQuestion === this.questions.length && this.questions.length != 0){
          this.openDialog();
        }
      }
    );
    this.questionsService.emitNumberOfAnswerdQuestion();
  }

  resetNotAndAnswer() {
    this.questionsService.resetNoteAndQuestionAnswerd();
  }

  onNewQuestion() {
    this.router.navigate(['/questions/new']);
    this.resetNotAndAnswer();
  }

  onDeleteQuestion(question: Questions){
    this.questionsService.removeQuestion(question);
    this.resetNotAndAnswer();
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

  openDialog(){
    alert("Votre score est de :" + this.note + "/" + this.numberOfAnswerdQuestion);
  }

  /* openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      'top': '0',
      left: '0'
    };

    this.dialog.open(AlertComponent, dialogConfig);
  } */

  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.numberOfAnswerdQuestionSubscription.unsubscribe();
  }

}
