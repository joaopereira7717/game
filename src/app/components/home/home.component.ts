import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {}

  login(username: string, password: string): void {
    this.gameService.logIn(username, password).subscribe((response) => {
      this.data = response;
      localStorage.setItem('id', this.data.data);
      this.router.navigateByUrl('city');
    });
  }

  signIn(username: string, password: string, passwordVerify: string) {
    password == passwordVerify
      ? this.gameService.signIn(username, password).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('createCharacter');
        })
      : alert('Passwords Diferentes!');
  }
}
