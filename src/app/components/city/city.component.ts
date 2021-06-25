import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //resolução de um bug que tinha na modal
    (document.querySelector('.modal-backdrop') as HTMLElement).style.display =
      'none';
  }
}
