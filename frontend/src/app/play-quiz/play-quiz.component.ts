import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FinishComponent } from '../finish/finish.component';


@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent {

  questions:any;
  quizId: any;

  constructor(private api: ApiService , private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.api.getQuestions(this.quizId).subscribe(res => {
      this.questions = res;

    this.questions.forEach(element => {
      element.answers = [
        element.correctAnswer,
        element.answer1, element.answer2, element.answer3 ]
        shuffle(element.answers);
    });
    });
  };

  finish(){
    var correct = 0;
    this.questions.forEach(element => {
      if(element.correctAnswer == element.selectedAnswer){
        correct++;
      }
    });
    const dialogRef = this.dialog.open(FinishComponent, {
     
      data: {correct, total: this.questions.length}
    });
    console.log('Correct Score: '+ correct);
  };

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}

function shuffle(a){
  for(let i = a.length; i; i--){
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
