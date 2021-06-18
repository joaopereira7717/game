import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four0four',
  templateUrl: './four0four.component.html',
  styleUrls: ['./four0four.component.css'],
})
export class Four0fourComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    (document.querySelector('.modal-backdrop') as HTMLElement).style.display =
      'none';
  }
}
