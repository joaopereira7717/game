import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private gameService: GameService) {}

  armaShop: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    (document.querySelector('.modal-backdrop') as HTMLElement).style.display =
      'none';
  }

  criarArma(
    name: string,
    atk: string,
    durabilidade: string,
    tipoArma: string,
    vida: string
  ) {
    this.gameService
      .createWeapon(name, atk, durabilidade, tipoArma, vida)
      .subscribe((data) => console.log(data));
  }

  getRandomWep() {
    this.gameService.getRandomWeapon().subscribe((data) => {
      this.armaShop = data;
    });
  }
}
