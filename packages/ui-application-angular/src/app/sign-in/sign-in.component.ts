import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationCommand, AuthenticationData, AuthenticationUseCase, ErrorAuthentication, Token } from 'domain-core';
import { delay, of, Subject, Subscription, switchMap, tap } from 'rxjs';

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
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup

  private _channelResultAuthenticationSub: Subscription | null = null

  constructor(
    private _fb: FormBuilder,
    private _router: Router,

    private _authenticationUseCase: AuthenticationUseCase,

    @Inject('CHANNEL_RESULT_AUTHENTICATION') 
      public channelResultAuthentication: Subject<ErrorAuthentication | Token | null>
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  isSuccessAuthentication: boolean | null = null
  
  ngOnInit(): void {
    this._channelResultAuthenticationSub = this.channelResultAuthentication.pipe(
      tap(event => {
        if (event instanceof ErrorAuthentication) {
          this.isSuccessAuthentication = false
          this.stateAnim = 'expanded'
          this.alertMessage = event.message
        }
        if (event instanceof Token) {
          window.localStorage.setItem('token', event.token)
          this._router.navigate(['/main'])
        }
      }),
      switchMap(event => {
        if (event instanceof ErrorAuthentication) {
          return of(event).pipe(
            delay(event ? 10000 : 0)
          )
        }
        return of(event)
      }),
      tap(event => {
        if (event instanceof ErrorAuthentication) {
          this.stateAnim = 'initial'
        }
      }),
      switchMap(event => {
        if (event instanceof ErrorAuthentication) {
          return of(event).pipe(
            delay(event ? 3000 : 0)
          )
        }
        return of(event)
      }),
    ).subscribe(_ => {
      this.isSuccessAuthentication = true
    })
  }

  ngOnDestroy(): void {
    this._channelResultAuthenticationSub?.unsubscribe()
  }

  stateAnim: string = 'initial'
  alertMessage: string | null = null

  onSignIn() {
    if (this.form.valid) {
      this._authenticationUseCase.authentication(new AuthenticationCommand(
        new AuthenticationData(this.form.value.email, this.form.value.password)
      ))
    }
  }

}
