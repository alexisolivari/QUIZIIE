import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { QuestionComponent } from './questions/question/question.component';
import { AnswerComponent } from './questions/answer/answer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { QuestionsFormComponent } from './questions/questions-form/questions-form.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {QuestionsService} from "./services/questions.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {QuestionListComponent} from "./questions/question-list/question-list.component";


const appRoutes: Routes = [
  {path: 'auth/signup' , component: SignupComponent },
  {path: 'auth/signin' , component: SigninComponent },
  {path: 'questions/question', canActivate: [AuthGuardService] , component: QuestionListComponent },
  {path: 'questions/new', canActivate: [AuthGuardService] , component: QuestionsFormComponent },
  {path: 'questions/view/:id', component: QuestionComponent},
  {path: '', redirectTo: 'questions/question', pathMatch: 'full'},
  {path: '**', redirectTo: 'questions/question'}
  /* {path: 'questions/singlequestion:id' , component: SingleQuestionComponent } */
  ];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    QuestionComponent,
    AnswerComponent,
    SigninComponent,
    QuestionsFormComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
