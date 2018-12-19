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
import { GererUtilisateurComponent } from "./gererUtilisateur/gererUtilisateur.component";
import { QuestionListAdminComponent } from './questions/question-list-admin/question-list-admin.component';
import {AdminGuardService} from "./services/admin-guard.service";
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { TransitionComponent } from './transition/transition.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { LadderBoardComponent } from './ladder-board/ladder-board.component';
import { PopUpComponent } from './questions/pop-up/pop-up.component';
import {ModalDialogModule} from "ngx-modal-dialog";
import { CustomModalComponent } from './questions/pop-up/custom-modal/custom-modal.component';



const appRoutes: Routes = [
  {path: 'auth/signup' , component: SignupComponent },
  {path: 'auth/signin' , component: SigninComponent },
  {path: 'home', component: HomeComponent},
  {path: 'questions/question', canActivate: [AuthGuardService] , component: QuestionListComponent },
  {path: 'questions/questionAdmin', canActivate: [AdminGuardService], component: QuestionListAdminComponent},
  {path: 'questions/new', canActivate: [AuthGuardService] , component: QuestionsFormComponent },
  {path: 'questions/view/:id', component: QuestionComponent},
  {path: 'transition', component: TransitionComponent},
  {path: 'gererUtilisateur',canActivate: [AdminGuardService], component: GererUtilisateurComponent},
  {path: 'user-history', canActivate: [AuthGuardService] , component: UserHistoryComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}

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
    GererUtilisateurComponent,
    AcountSettingsComponent,
    TransitionComponent,
    QuestionListAdminComponent,
    AcountSettingsComponent,
    HomeComponent,
    FooterComponent,
    UserHistoryComponent,
    LadderBoardComponent,
    PopUpComponent,
    CustomModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule,
    ModalDialogModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    QuestionsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent, CustomModalComponent]
})
export class AppModule { }
