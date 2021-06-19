import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/system/interfaces/player';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  players: Player[] | any;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.getCharById();
  }

  logout() {
    this.gameService.logout();
    this.router.navigateByUrl('home');
  }

  getCharById() {
    this.gameService
      .getCharById()
      .subscribe((player) => (this.players = player.data.Personagens[0]));
  }
}
