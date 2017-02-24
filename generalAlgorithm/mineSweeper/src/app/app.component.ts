import { Component } from '@angular/core';
import { Position, Mines } from './Mines';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  game:Mines;
  isGameStarted:boolean = false;
  difficulty:String;
  gameOver:boolean;
  startNewGame() {
  	this.game = new Mines(this.difficulty);
  	this.isGameStarted = true;
  }

  reveal(position) {
  	this.gameOver = this.game.reveal(position);
  }
  revealAllConnectedZero(position) {
  	this.game.revealAllConnectedZero(position);
  }
  tagAsBomb(pos, e) {
  	e.preventDefault();
  	this.game.tagAsBomb(pos);
  }
}