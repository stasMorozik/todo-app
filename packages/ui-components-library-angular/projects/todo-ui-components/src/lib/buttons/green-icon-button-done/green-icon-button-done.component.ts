import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'green-icon-button-done',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styleUrls: [
    '../button/button.component.css',
    '../icon-button/icon-button.component.css',
    '../green-button/green-button.component.css',
    './green-icon-button-done.component.css'
  ]
})
export class GreenIconButtonDoneComponent extends ButtonComponent implements OnInit {

  constructor() {
    super()
  }

  override ngOnInit(): void {
  }

}
