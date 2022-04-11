import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('alert', [
      state('initial', style({ opacity: 0, zIndex: -1 })),
      state('expanded', style({ opacity: 1, zIndex: 2 })),
      transition('* => expanded', animate('0.3s')),
      transition('* => initial', animate('2s')),
    ]),
  ],
})
export class SignInComponent implements OnInit {
  form: FormGroup
  constructor(
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  stateAnim: string = 'initial'
  alertMessage: string | null = null

  onSignUp() {
    if (this.form.valid) {

    }
  }

}
