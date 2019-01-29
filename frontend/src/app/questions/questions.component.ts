import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  question: any = {};
  questions: any;
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    var quizId = this.route.snapshot.paramMap.get('quizId');
    
    this.api.getQuestions(quizId).subscribe(res => {
      this.questions = res;
    });
  }

}
