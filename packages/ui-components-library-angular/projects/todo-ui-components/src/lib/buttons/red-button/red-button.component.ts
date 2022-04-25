import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'red-button',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styleUrls: [
    '../button/button.component.css',
    './red-button.component.css'
  ]
})
export class RedButtonComponent extends ButtonComponent implements OnInit {

  constructor() {
    super()
  }

  override ngOnInit(): void {
  }

}
