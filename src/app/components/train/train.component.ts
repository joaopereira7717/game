import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/system/interfaces/player';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css'],
})
export class TrainComponent implements OnInit {
  players: Player[] | any;
  players1: any;
  constructor(
    private gameService: GameService,
    private cookieService: CookieService
  ) {}

  getCharById() {
    this.gameService
      .getCharById()
      .subscribe((player) => (this.players = player.data.Personagens[0]));
  }

  ngOnInit(): void {
    this.getCharById();
  }

  stopTrain(
    element1: HTMLElement,
    element2: HTMLElement,
    element3: HTMLElement,
    trasform: string | null
  ) {
    setTimeout(() => {
      element1.style.opacity = '1';
      element2.style.opacity = '1';
      element3.style.opacity = '1';
      if (trasform != null) element3.style.transform = trasform;
      this.cookieService.set('treinado', 'simsenhora', {
        expires: 1,
      });
    }, 5000);
  }

  // just run once per day using function above
  train(
    type: string,
    brain: HTMLElement,
    attack: HTMLElement,
    health: HTMLElement
  ) {
    if (this.cookieService.check('treinado')) {
      alert('VAI TRABALHAR MALANDRO!');
      return;
    }
    if (type == null) return;
    if (type == 'brain') {
      attack.style.opacity = '0';
      health.style.opacity = '0';
      this.stopTrain(attack, health, brain, null);
      this.players.Int++;
    } else if (type == 'attack') {
      brain.style.opacity = '0';
      health.style.opacity = '0';
      attack.style.transform = 'translate(25em, 0)';
      this.stopTrain(brain, health, attack, 'translate(0em, 0)');
      this.players.Atk++;
    } else if (type == 'health') {
      brain.style.opacity = '0';
      attack.style.opacity = '0';
      health.style.transform = 'translate(-25em, 0)';
      this.stopTrain(attack, brain, health, 'translate(0em, 0)');
      this.players.Vida++;
    }
    this.gameService.updateStats(this.players).then(() => {
      this.getCharById();
      console.log(this.players);
    });
  }
}
