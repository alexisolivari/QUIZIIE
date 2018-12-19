import {Component, OnChanges, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Questions} from "../../models/Questions.model";
import {Subscription} from "rxjs";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {Alert} from "selenium-webdriver";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AlertComponent} from "../../utilities/alert/alert.component";
import * as firebase from "firebase";
import {AuthService} from "../../services/auth.service";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  readonly NUMBER_OF_QUESTION = 10;

  questions: Questions[];
  questionsSubscription: Subscription;
  isEmpty : boolean = false;

  listOfRandomQuestions: Questions[] = [];

  listQuestionClickedId : number[][] = [];

  listOfVoteNumber : number[] = [];

  note: number;
  noteSubscription: Subscription;

  numberOfAnswerdQuestion: number;
  numberOfAnswerdQuestionSubscription: Subscription;

  buttonColor: string = "btn-primary";

  isAuth = false;
  isAdmin = false;


  constructor(private authService: AuthService,
              private questionsService: QuestionsService,
              private router: Router,
              private dialog: MatDialog,
              ) {
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
          this.resetNotAndAnswer();
          this.questionsService.saveQuestions();
        }
      }
    );
    this.questionsService.emitNumberOfAnswerdQuestion();

    this.resetNotAndAnswer();
    this.newQuestions();
  /*
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user)
        {
          this.isAuth = true;
          if (this.authService.getUserInfo().isAdmin)
          {
            this.isAdmin = true;
          }
          else
            {
              this.isAdmin = false;
            }
        }
        else
          {
            this.isAdmin = false;
            this.isAuth = false;
          }

      })
  */
  }


  condition(question: Questions){
    console.log( "list of vote numbers" ,this.listOfVoteNumber)
    if(question.questionVote === this.listOfVoteNumber[this.questionsService.questions.indexOf(question)]){
      return true;
    }
    else{
      return false;
    }

  }

  resetNotAndAnswer() {
    this.listQuestionClickedId = [];
    this.questionsService.resetNoteAndQuestionAnswerd();
  }

  onNewQuestion() {
    this.router.navigate(['/questions/new']);
    this.resetNotAndAnswer();
    this.questionsService.getQuestions();
  }

  /*onDeleteQuestion(question: Questions){
    this.questionsService.removeQuestion(question);
    this.resetNotAndAnswer();
    this.questionsService.getQuestions();
  }

  onViewQuestion(id : number){
    this.router.navigate(['/questions/view/' + id]);
    this.resetNotAndAnswer();
  }*/

  onUpVoteQuestion(question : Questions){
    this.questionsService.upVoteQuestion(question)
  }

  onDownVoteQuestion(question : Questions){
    this.questionsService.downVoteQuestion(question)
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

  newQuestions(){
    console.log("questions en cash",this.listOfRandomQuestions);
    console.log("questions dans la base de donnée" , this.questionsService.getQuestionsFromUsers())
    this.listOfVoteNumber = [];
    for (let question of this.questionsService.questions){
      this.listOfVoteNumber.push(question.questionVote);
    }
    let l_questions = this.excludeQuestions(this.questions, this.questionsService.getQuestionsFromUsers());
    this.resetNotAndAnswer();
    this.listOfRandomQuestions = this.generateRandomQuestions(l_questions, this.NUMBER_OF_QUESTION);
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

  equals(other1:Questions, other2:Questions) {
    return other1.question === other2.question && other1.goodAnswer === other2.goodAnswer;
  }

  in(q : Questions, set : Questions[])
  {
    let i = 0;
    for (i=0; i < set.length; i++){
      if (this.equals(set[i],q)){
        return true;
      }
    }
    return false;
  }

  isin(question : Questions, questionList : Questions[])
  {
    let i;
    for (i=0; i<questionList.length;i++)
    {
      if (question.goodAnswer===questionList[i].goodAnswer && question.question===questionList[i].question)
      {
        return true;
      }
    }
    return false;
  }

  excludeQuestions(fullQuestionList : Questions[], questionListToRemove : Questions[])
  {
    let ret = [];
    for (let question of fullQuestionList) {
        if (!this.isin(question, questionListToRemove)) {
          ret.push(question);
        }
    }
    return ret;
  }


  generateRandomQuestions(questionsList : Questions[], numberOfQuestion : number  ){
    let listOfRandomQuestion : Questions[] = [];
    let listOfRandomNumber : number[] = [];
    let randomNumber : number;

    this.listOfVoteNumber = [];
    for (let question of this.questionsService.questions){
      this.listOfVoteNumber.push(question.questionVote);
    }

    if(numberOfQuestion <= questionsList.length) {
        console.log("Number of question is ok");
    }
    else{
      numberOfQuestion = questionsList.length;
    }
      while (listOfRandomNumber.length < numberOfQuestion) {
        randomNumber = this.randomInt(0, questionsList.length-1);

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
    this.isEmpty = (listOfRandomQuestion.length === 0);
    return listOfRandomQuestion;

  }

  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.numberOfAnswerdQuestionSubscription.unsubscribe();
  }

}
