import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { QuestionComponent } from './questions/question/question.component';
import { AnswerComponent } from './questions/answer/answer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { QuestionsFormComponent } from './questions/questions-form/questions-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    QuestionComponent,
    AnswerComponent,
    SigninComponent,
    QuestionsFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
