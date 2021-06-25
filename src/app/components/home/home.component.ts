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
  //login
  login(username: string, password: string): void {
    this.gameService.logIn(username, password).subscribe((response) => {
      this.data = response;
      localStorage.setItem('id', this.data.data); //guarda a data na localstorage
      this.router.navigateByUrl('city'); //vai para a cidade
    });
  }

  signIn(username: string, password: string, passwordVerify: string) {
    //se as passwords forem iguais regista e redireciona para a página createcharacter
    //se nao diz que sao diferentes
    password == passwordVerify
      ? this.gameService.signIn(username, password).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('createCharacter');
        })
      : alert('Passwords Diferentes!');
  }
}
