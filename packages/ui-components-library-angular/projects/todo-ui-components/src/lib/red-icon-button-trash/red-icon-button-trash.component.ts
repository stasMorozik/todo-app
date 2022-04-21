import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'red-icon-button-trash',
  template: `
    <button [attr.disabled]="disabled ? 'disabled' : null"><ng-content></ng-content></button>
  `,
  styleUrls: [
    '../button/button.component.css',
    '../icon-button/icon-button.component.css',
    '../red-button/red-button.component.css',
    './red-icon-button-trash.component.css'
  ]
})
export class RedIconButtonTrashComponent extends ButtonComponent implements OnInit {

  constructor() {
    super()
  }

  override ngOnInit(): void {
  }

}
