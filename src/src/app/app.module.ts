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
import { AlertComponent } from './utilities/alert/alert.component';
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TmpTestComponent } from './tmp-test/tmp-test.component';
<<<<<<< HEAD
import { QuestionListAdminComponent } from './questions/question-list-admin/question-list-admin.component';
import {AdminGuardService} from "./services/admin-guard.service";
=======
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
<<<<<<< HEAD
import { TransitionComponent } from './transition/transition.component';
=======
>>>>>>> 81bda3b867283e2e9de838d96936fd1064ebb00f
>>>>>>> 40e74eba76233fae6fea133634440d62e8227227



const appRoutes: Routes = [
  {path: 'auth/signup' , component: SignupComponent },
  {path: 'auth/signin' , component: SigninComponent },
  {path: 'questions/question', canActivate: [AuthGuardService] , component: QuestionListComponent },
  {path: 'questions/questionAdmin', canActivate: [AdminGuardService], component: QuestionListAdminComponent},
  {path: 'questions/new', canActivate: [AuthGuardService] , component: QuestionsFormComponent },
  {path: 'questions/view/:id', component: QuestionComponent},
<<<<<<< HEAD
  {path: 'tmp-test', component: TmpTestComponent},
  {path: 'transition', component: TransitionComponent},
=======
  {path: 'tmp-test',canActivate: [AdminGuardService], component: TmpTestComponent},
>>>>>>> 40e74eba76233fae6fea133634440d62e8227227
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
    QuestionListComponent,
    AlertComponent,
    TmpTestComponent,
<<<<<<< HEAD
    AcountSettingsComponent,
    TransitionComponent
=======
<<<<<<< HEAD
    QuestionListAdminComponent
=======
    AcountSettingsComponent
>>>>>>> 81bda3b867283e2e9de838d96936fd1064ebb00f
>>>>>>> 40e74eba76233fae6fea133634440d62e8227227
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    QuestionsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
