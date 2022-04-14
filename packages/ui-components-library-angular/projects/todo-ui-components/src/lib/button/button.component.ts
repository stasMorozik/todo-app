import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <button><ng-content></ng-content></button>
  `,
  styles: [`
    box-shadow: 0px 1px 1px 2px #80808073;
    border-radius: 3px;
    color: #000000;
    border: none;
  `]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
