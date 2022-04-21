import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'blue-button',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styleUrls: [
    '../button/button.component.css',
    './blue-button.component.css'
  ]
})
export class BlueButtonComponent extends ButtonComponent implements OnInit {

  constructor() {
    super()
  }

  override ngOnInit(): void {
  }

}
