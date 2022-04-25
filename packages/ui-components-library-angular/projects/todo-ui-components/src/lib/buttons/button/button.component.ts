import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styles: [
    `
      button:focus {
        background-color: #d3d3d3;
      }
    `
  ],
  styleUrls: [
    './button.component.css'
  ]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() disabled = false

  ngOnInit(): void {
  }

}
