import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  login(username: string, password: string) {
    this.gameService
      .logIn(username, password)
      .subscribe((data) => console.log(data));
  }

  signIn(username: string, password: string, passwordVerify: string) {
    password == passwordVerify
      ? this.gameService
          .signIn(username, password)
          .subscribe((data) => console.log(data))
      : alert('Passwords Diferentes!');
  }
}
