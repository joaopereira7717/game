import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createcharacter',
  templateUrl: './createcharacter.component.html',
  styleUrls: ['./createcharacter.component.css'],
})
export class CreatecharacterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  skillLimiter(
    ataque: HTMLInputElement,
    inteligencia: HTMLInputElement,
    saude: HTMLInputElement,
    limit: HTMLElement
  ) {
    let limiter: number = 30;

    limiter = limiter - parseInt(ataque.value);
    limiter = limiter - parseInt(inteligencia.value);
    limiter = limiter - parseInt(saude.value);

    if (limiter == 0) {
      ataque.max = ataque.value;
      inteligencia.max = inteligencia.value;
      saude.max = saude.value;

      ataque.value = ataque.max;
      inteligencia.value = inteligencia.max;
      saude.value = saude.max;
    } else if (limiter < 0) {
      alert('Parece que passou o limite de skill pointeligencias recebidos :(');

      ataque.value = '10';
      inteligencia.value = '10';
      saude.value = '10';

      ataque.max = '20';
      inteligencia.max = '20';
      saude.max = '20';

      limiter = 0;
    } else {
      ataque.max = '20';
      inteligencia.max = '20';
      saude.max = '20';
    }

    limit.innerText = limiter.toString();
  }
}
