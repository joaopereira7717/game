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
  //variaveis para o player e oponente etc

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

    //para atualizar a vida, unica solução para o bug que nao atualizava

    setTimeout(() => {
      this.vidaAtual1 = this.players.Vida;
      this.vidaAtual2 = this.player1.Vida;

      this.vidaPercentagem1 = Number(
        (this.vidaAtual1 / this.players.Vida) * 100
      );
      this.vidaPercentagem2 = (this.vidaAtual2 / this.player1.Vida) * 100;
    }, 1000);
  }

  ngAfterViewInit(): void {}
  //ir buscar o character em que fizemos login
  getCharById() {
    this.gameService
      .getCharById()
      .subscribe((player) => (this.players = player.data.Personagens[0]));
  }
  //ir buscar o oponente
  getRandomChar() {
    this.gameService
      .getRandomChar()
      .subscribe((player) => (this.player1 = player.data));
  }
  //ir buscar a arma do player
  getWeaponByPlayerID(id: number) {
    this.gameService.getWeaponByPlayerID(id).subscribe((data) => {
      this.armaPlayer = data;
    });
  }
  //inicio da batalha
  batalha(
    left: HTMLElement, //jogador
    right: HTMLElement, //oponente
    acertou: HTMLElement, //label do HIT
    falhou: HTMLElement // label do FAIL
  ) {
    let isDead = false;
    let interval = setInterval(() => {
      let didHit = this.getRndNum(); //probabilidade de acertar
      let player = this.getRndNum() >= 4 ? this.players : this.player1; //quem ataca
      let didDamage = this.hitMiss(didHit, player); //dá dano ou nao

      if (player == this.players) {
        //se o player for igual ao player que temos
        this.vidaAtual1 = this.vidaAtual1 - didDamage;
        this.vidaPercentagem1 = Number(
          (this.vidaAtual1 / this.players.Vida) * 100 //% de vida
        );
        right.classList.add('rightAtack'); //adiciona classe
        left.classList.add('hit'); //adiciona classe
        if (didDamage > 0) {
          //se der damage
          acertou.style.display = 'block'; //mostra a label de hit
          setTimeout(() => {
            //passado 1.5s esconde
            acertou.style.display = 'none';
          }, 1500);
        } else {
          falhou.style.display = 'block';
          setTimeout(() => {
            falhou.style.display = 'none';
          }, 1500);
        }
        setTimeout(() => {
          //animação de ataque
          right.classList.remove('rightAtack');
          left.classList.remove('hit');
        }, 1500);
        if (this.vidaPercentagem1 <= 0) {
          //se a percentagem for menor ou igual a 0
          this.vidaPercentagem1 = 0;
          isDead = true;
          left.style.display = 'none';
          alert('Perdeu! RIP!');
        }
      } else {
        this.vidaAtual2 = this.vidaAtual2 - didDamage;
        this.vidaPercentagem2 = (this.vidaAtual2 / this.player1.Vida) * 100;
        left.classList.add('leftAtack');
        right.classList.add('hit');
        if ((didDamage = 0)) {
          acertou.style.display = 'block';
          setTimeout(() => {
            acertou.style.display = 'none';
          }, 1500);
        } else {
          falhou.style.display = 'block';
          setTimeout(() => {
            falhou.style.display = 'none';
          }, 1500);
        }
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
        // se morrer
        clearInterval(interval); //da clear no intervalo
        setTimeout(() => {
          //1s e retorna para a pagina cidade
          this.router.navigateByUrl('/city');
        }, 1000);
      }
    }, 1500);
  }

  //nr random de 1 a 10
  getRndNum() {
    return Math.random() * (10 - 1) + 1;
  }

  hitMiss(didHit: number, player: Player): number {
    this.getWeaponByPlayerID(player.ID_Player); // vai buscar a arma pelo id do characher
    let danoArma = this.armaPlayer.data.Armas[0].Atk; //dano da arma
    let damage: number = player.Atk; //dano do player
    let danoTotal = damage; // dano total

    if (danoArma != undefined) {
      //se tiver arma
      danoTotal += danoArma;
    }

    if (didHit >= 4) {
      return (danoTotal *= didHit / 10); //se for menor ou igual a 4, acerta se nao falha
    } else {
      return (danoTotal = 0);
    }
  }
}
