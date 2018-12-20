import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../services/questions.service";
import {UserInfoModel} from "../models/UserInfoModel.model";
import {AuthService} from "../services/auth.service";
import {Questions} from "../models/Questions.model";
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  user_question_list = this.qs.getQuestionsFromUsers();
  question_list = this.qs.questions;
  user = this.as.user;

  public searchString: string;

  getScore(user: UserInfoModel , questionList : Questions[])
  {
    let userQuestionList = this.qs.getQuestionsFromUsers2(user.uid);
    this.clean(userQuestionList, questionList, user.uid);
    userQuestionList = this.qs.getQuestionsFromUsers2(user.uid);
    return userQuestionList.length;
  }

  in(question: Questions, questionList : Questions[])
  {
    let i;
    let ret = 0;
    for (i=0; i < questionList.length; i++)
    {
      if (question.question === questionList[i].question && question.goodAnswer === questionList[i].goodAnswer)
      {
        return 1;
      }
    }
    return 0;
  }

  onViewQuestion(id : number){
    this.router.navigate(['/questions/view/' + id]);
  }

  clean(userQuestions: Questions[], questionList : Questions[], uid : String)
  {
    let i;
    for (i = 0; i < userQuestions.length; i++)
    {
      if (this.in(userQuestions[i], questionList) === 0)
      {
        firebase.database().ref("auth/"+uid+"/questions/"+this.qs.questionHash(userQuestions[i])).remove();
      }
    }
  }

  transform(userList, value: string) {
    return(this.qs.transform2(userList, value));
  }

  constructor(private qs : QuestionsService ,
              private as : AuthService,
              private router: Router,) {  }

  ngOnInit() {
  }

}
