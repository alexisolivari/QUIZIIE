import {Component, OnDestroy, OnInit} from '@angular/core';
import {Questions} from "../../models/Questions.model";
import {Subscription} from "rxjs";
import {QuestionsService} from "../../services/questions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  questions: Questions[];
  questionsSubscription: Subscription;

  questionClickedId : number = -1;

  buttonColor: string = "btn-primary";



  constructor(private questionsService: QuestionsService,
              private router: Router) { }

  ngOnInit() {
    this.questionsSubscription = this.questionsService.questionsSubject.subscribe(
      (questions: Questions[]) => {
        this.questions = questions
      }
    );
    this.questionsService.getQuestions();
    this.questionsService.emitQuestions();
  }

  onNewQuestion() {
    this.router.navigate(['/questions/new'])
  }

  onDeleteQuestion(question: Questions){
    this.questionsService.removeQuestion(question);
  }

  onViewQuestion(id : number){
    this.router.navigate(['/questions/view/' + id]);
    console.log(id)
  }

  onValidateAnswer(answer: string, question: Questions, i : number ) {
    this.buttonColor = this.questionsService.validateAnswer(answer, question);
    this.questionClickedId = i;


  }

  ngOnDestroy(){
    this.questionsSubscription.unsubscribe();
  }

}
