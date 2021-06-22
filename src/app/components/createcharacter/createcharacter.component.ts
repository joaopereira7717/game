import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-createcharacter',
  templateUrl: './createcharacter.component.html',
  styleUrls: ['./createcharacter.component.css'],
})
export class CreatecharacterComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    (document.querySelector('.modal-backdrop') as HTMLElement).style.display =
      'none';
  }

  skillLimit(
    ataque: HTMLInputElement,
    inteligencia: HTMLInputElement,
    saude: HTMLInputElement,
    limit: HTMLElement
  ) {
    let maximo: number = 30;

    maximo -= parseInt(ataque.value);
    maximo -= parseInt(inteligencia.value);
    maximo -= parseInt(saude.value);

    if (maximo == 0) {
      alert('Chegou ao maximo de pontos utilizaveis!');
      ataque.disabled = inteligencia.disabled = saude.disabled = true;
      saude.max = saude.value;
      ataque.max = ataque.value;
      inteligencia.max = inteligencia.value;
    } else if (maximo < 0) {
      alert('Chegou ao maximo de pontos utilizaveis!');
    }
    limit.innerText = maximo.toString();
  }

  clearSkills(
    ataque: HTMLInputElement,
    inteligencia: HTMLInputElement,
    saude: HTMLInputElement
  ) {
    ataque.max = inteligencia.max = saude.max = '15';
    ataque.value = inteligencia.value = saude.value = '0';
    ataque.disabled = inteligencia.disabled = saude.disabled = false;
  }

  createChar(
    name: string,
    ataque: string,
    inteligencia: string,
    saude: string,
    username: string,
    password: string
  ) {
    let objeto = {
      name: name,
      ataque: ataque,
      inteligencia: inteligencia,
      saude: saude,
      username: username,
      password: password,
    };

    this.gameService
      .createChar(name, ataque, inteligencia, saude, username, password)
      .subscribe((data) => {
        let codigo = data;
        alert('Criado Com Sucesso!');
        this.router.navigateByUrl('/home');
      });
  }
}
