import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'icon-button',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styleUrls: [
    '../button/button.component.css',
    './icon-button.component.css'
  ]
})
export class IconButtonComponent extends ButtonComponent implements OnInit {

  constructor() {
    super()
  }

  override ngOnInit(): void {
  }

}
