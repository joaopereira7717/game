import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.gameService.logout();
    this.router.navigateByUrl('home');
  }
}
