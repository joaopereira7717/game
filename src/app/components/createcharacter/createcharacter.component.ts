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
    atk: HTMLInputElement,
    int: HTMLInputElement,
    lp: HTMLInputElement,
    limit: HTMLElement
  ) {
    let limiter: number = 30;

    limiter = limiter - parseInt(atk.value);
    limiter = limiter - parseInt(int.value);
    limiter = limiter - parseInt(lp.value);

    if (limiter == 0) {
      atk.max = atk.value;
      int.max = int.value;
      lp.max = lp.value;

      atk.value = atk.max;
      int.value = int.max;
      lp.value = lp.max;
    } else if (limiter < 0) {
      alert('Parece que passou o limite de skill points recebidos :(');

      atk.value = '10';
      int.value = '10';
      lp.value = '10';

      atk.max = '20';
      int.max = '20';
      lp.max = '20';

      limiter = 0;
    } else {
      atk.max = '20';
      int.max = '20';
      lp.max = '20';
    }

    limit.innerText = limiter.toString();
  }
}
