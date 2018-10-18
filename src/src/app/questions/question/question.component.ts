import { Component, OnInit } from '@angular/core';
import {Questions} from "../../models/Questions.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: Questions;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionsService,
              private router: Router
            ) { }

  ngOnInit() {
    this.question = new Questions('', [],'César');
    const id = this.route.snapshot.params['id'];
    this.questionService.getSingleQuestions(+id).then(
      (question: Questions) => {
        this.question = question;
      }
    );

  }

  onBack() {
    this.router.navigate(['/questions/question']);
  }

}
