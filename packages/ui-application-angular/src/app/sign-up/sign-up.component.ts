import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  ErrorAlreadyExists, 
  ErrorValidationEmailDto, 
  ErrorValidationNameDto, 
  ErrorValidationPasswordDto, 
  RegistrationCommand, 
  RegistrationUseCase,
  RegitrationData,
  SuccessValidationEmailDto,
  SuccessValidationNameDto,
  SuccessValidationPasswordDto,
  User,
  ValidationEmailCommand,
  ValidationNameCommand, 
  ValidationPasswordCommand
} from 'domain-core';
import { delay, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('alert', [
      state('initial', style({ opacity: 0, zIndex: -1 })),
      state('expanded', style({ opacity: 1, zIndex: 2 })),
      transition('* => expanded', animate('0.3s')),
      transition('* => initial', animate('2s')),
    ]),
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup
  private _channelResultValidationSub: Subscription | null = null
  private _channelErrorRegistrationSub: Subscription | null = null
  constructor(
    private _fb: FormBuilder,

    @Inject(RegistrationUseCase)
      private readonly _registrationUseCase: RegistrationUseCase,

    @Inject('CHANNEL_SUCCESS_REGISTRATION') 
      public channelSuccessRegistration: Subject<User | null>,
    @Inject('CHANNEL_ERROR_REGISTRATION') 
      public channelErrorRegistration: Subject<ErrorAlreadyExists | null>,
    @Inject('CHANNEL_RESULT_VALIDATION') 
      public channelResultValidation: Subject<
      ErrorValidationNameDto       | 
      ErrorValidationEmailDto      | 
      ErrorValidationPasswordDto   | 
      SuccessValidationEmailDto    | 
      SuccessValidationNameDto     | 
      SuccessValidationPasswordDto | 
      null
    >
  ) {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  isSuccessValidationName: null | boolean = null
  isSuccessValidationEmail: null | boolean = null
  isSuccessValidationPassword: null | boolean = null

  stateAnim: string = 'initial'

  alertMessage: string | null = null

  ngOnInit(): void {

    this.channelSuccessRegistration.subscribe(event => {
      console.log(event)
    })

    this._channelErrorRegistrationSub = this.channelErrorRegistration.pipe(
      tap(err => {
        if (err) {
          this.stateAnim = 'expanded'
          this.alertMessage = err.message
        }
      }),
      switchMap(err => {
        return of(err).pipe(
          delay(err ? 10000 : 0)
        )
      })
    ).subscribe(err => {
      this.stateAnim = 'initial'
    })

    this._channelResultValidationSub = this.channelResultValidation.subscribe(event => {
      if (event instanceof SuccessValidationNameDto) {
        this.isSuccessValidationName = true
      }

      if (event instanceof ErrorValidationNameDto) {
        this.isSuccessValidationName = false
      }

      if (event instanceof SuccessValidationEmailDto) {
        this.isSuccessValidationEmail = true
      }

      if (event instanceof ErrorValidationEmailDto) {
        this.isSuccessValidationEmail = false
      }

      if (event instanceof SuccessValidationPasswordDto) {
        this.isSuccessValidationPassword = true
      }

      if (event instanceof ErrorValidationPasswordDto) {
        this.isSuccessValidationPassword = false
      }
    })
  }

  ngOnDestroy(): void {
    this._channelResultValidationSub?.unsubscribe()
    this._channelErrorRegistrationSub?.unsubscribe()
  }

  onSignUp() {
    if (
      this.form.valid &&
      this.isSuccessValidationName &&
      this.isSuccessValidationEmail &&
      this.isSuccessValidationPassword
    ) {
      this._registrationUseCase.registration(new RegistrationCommand(
        new RegitrationData(
          this.form.value.name,
          this.form.value.email,
          this.form.value.password
        )
      ))
    }
  }

  onChangeName() {
    this._registrationUseCase.registration(new ValidationNameCommand(this.form.get('name')?.value))
  }

  onChangeEmail() {
    this._registrationUseCase.registration(new ValidationEmailCommand(this.form.get('email')?.value))
  }

  onChangePassword() {
    this._registrationUseCase.registration(new ValidationPasswordCommand(this.form.get('password')?.value))
  }

}