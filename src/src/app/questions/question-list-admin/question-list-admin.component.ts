import {Component, OnDestroy, OnInit} from '@angular/core';
import {Questions} from "../../models/Questions.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-question-list-admin',
  templateUrl: './question-list-admin.component.html',
  styleUrls: ['./question-list-admin.component.css']
})
export class QuestionListAdminComponent implements OnInit, OnDestroy {

  readonly NUMBER_OF_QUESTION = 100;

  questions: Questions[];
  questionsSubscription: Subscription;

  isEmpty : boolean = false;

  public searchString: string;

  buttonColor: string = "btn-primary";

  isAuth = false;
  isAdmin = false;


  constructor(private authService: AuthService,
              private questionsService: QuestionsService,
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


  }
  onNewQuestion() {
    this.router.navigate(['/questions/new']);
    this.questionsService.getQuestions();
  }

  onDeleteQuestion(question: Questions){
    this.questionsService.removeQuestion(question);
    this.questionsService.getQuestions();
  }

  onViewQuestion(id : number){
    this.router.navigate(['/questions/view/' + id]);
  }

  onValidateAnswer(answer: string, question: Questions, indexQuestion : number, indexAnswer : number ) {
    this.buttonColor = this.questionsService.validateAnswer(answer, question);
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

  transform(userList, value: string) {
    return(this.questionsService.transform2(userList, value));
  }



  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
  }

}
