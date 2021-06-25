import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/system/interfaces/player';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
})
export class ArenaComponent implements OnInit {
  players: Player[] | any;
  player1: Player[] | any;
  vidaAtual1!: Number | any;
  vidaAtual2!: Number | any;
  vidaPercentagem1!: Number | any;
  vidaPercentagem2!: Number | any;
  armaPlayer: any;

  constructor(private gameService: GameService, private router: Router) {
    this.vidaPercentagem1 = 1;
    this.vidaPercentagem2 = 1;
  }

  ngOnInit(): void {
    this.getCharById();
    this.getRandomChar();

    setTimeout(() => {
      this.vidaAtual1 = this.players.Vida;
      this.vidaAtual2 = this.player1.Vida;

      this.vidaPercentagem1 = Number(
        (this.vidaAtual1 / this.players.Vida) * 100
      );
      this.vidaPercentagem2 = (this.vidaAtual2 / this.player1.Vida) * 100;
    }, 1000);
  }

  ngAfterViewInit(): void {
    (document.querySelector('.modal-backdrop') as HTMLElement).style.display =
      'none';
  }

  getCharById() {
    this.gameService
      .getCharById()
      .subscribe((player) => (this.players = player.data.Personagens[0]));
  }

  getRandomChar() {
    this.gameService
      .getRandomChar()
      .subscribe((player) => (this.player1 = player.data));
  }

  getWeaponByPlayerID(id: number) {
    this.gameService.getWeaponByPlayerID(id).subscribe((data) => {
      this.armaPlayer = data;
    });
  }

  batalha(left: HTMLElement, right: HTMLElement) {
    let isDead = false;
    let interval = setInterval(() => {
      let didHit = this.getRndNum();
      let player = this.getRndNum() >= 4 ? this.players : this.player1;
      let didDamage = this.hitMiss(didHit, player);

      if (player == this.players) {
        this.vidaAtual1 = this.vidaAtual1 - didDamage;
        this.vidaPercentagem1 = Number(
          (this.vidaAtual1 / this.players.Vida) * 100
        );
        right.classList.add('rightAtack');
        left.classList.add('hit');
        setTimeout(() => {
          right.classList.remove('rightAtack');
          left.classList.remove('hit');
        }, 1500);
        if (this.vidaPercentagem1 < 0) {
          this.vidaPercentagem1 = 0;
          isDead = true;
          left.style.display = 'none';
          alert('Perdeu!');
        }
      } else {
        this.vidaAtual2 = this.vidaAtual2 - didDamage;
        this.vidaPercentagem2 = (this.vidaAtual2 / this.player1.Vida) * 100;
        left.classList.add('leftAtack');
        right.classList.add('hit');
        setTimeout(() => {
          left.classList.remove('leftAtack');
          right.classList.remove('hit');
        }, 1500);
        if (this.vidaPercentagem2 < 0) {
          this.vidaPercentagem2 = 0;
          isDead = true;
          right.style.display = 'none';
          alert('Ganhou!');
        }
      }

      if (isDead) {
        clearInterval(interval);
        setTimeout(() => {
          alert('FIM DO JOGO');
          this.router.navigateByUrl('/city');
        }, 1000);
      }
    }, 2000);
  }

  getRndNum() {
    return Math.random() * (10 - 1) + 1;
  }

  hitMiss(didHit: number, player: Player): number {
    this.getWeaponByPlayerID(player.ID_Player);
    console.log(this.armaPlayer.data.Armas[0].Atk);
    let danoArma = this.armaPlayer.data.Armas[0].Atk;
    let damage: number = player.Atk;
    let danoTotal = danoArma + damage;
    if (didHit >= 4) {
      return (danoTotal *= didHit / 10);
    } else {
      return (danoTotal = 0);
    }
  }
}
