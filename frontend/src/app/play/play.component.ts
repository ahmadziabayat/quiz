import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  quizzes:any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllQuizzes().subscribe(res => {
      this.quizzes = res;
    });
  }
}
