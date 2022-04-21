import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  ErrorAlreadyExists, 
  ErrorValidationEmailDto, 
  ErrorValidationNameDto, 
  ErrorValidationPasswordDto, 
  RegistrationCommand, 
  RegistrationUseCase,
  RegistrationData,
  SuccessValidationEmailDto,
  SuccessValidationNameDto,
  SuccessValidationPasswordDto,
  User,
  ValidationEmailCommand,
  ValidationNameCommand, 
  ValidationPasswordCommand,
  ValidationUseCase
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
  private _channelResultRegistrationSub: Subscription | null = null
  
  constructor(
    private _fb: FormBuilder,
  
    private readonly _registrationUseCase: RegistrationUseCase,
    private readonly _validationUseCase: ValidationUseCase,

    @Inject('CHANNEL_RESULT_REGISTRATION') 
      public channelResultRegistration: Subject<User | ErrorAlreadyExists | null>,

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

  isSuccessRegistration: null | boolean = null
  isProcessRegistration: null | boolean = null


  stateAnim: string = 'initial'

  alertMessage: string | null = null

  ngOnInit(): void {

    this._channelResultRegistrationSub = this.channelResultRegistration.pipe(
      delay(2000),
      tap(event => {
        this.isProcessRegistration = false
        if (event instanceof ErrorAlreadyExists) {
          this.alertMessage = event.message
          this.isSuccessRegistration = false
        }
        if (event instanceof User) {
          this.alertMessage = `Hello ${event.name} you have successfuly registered and can login`
          this.isSuccessRegistration = true
          this.form.reset()
        }
      }),
      switchMap(event => {
        return of(event).pipe(
          delay(event ? 10000 : 0)
        )
      }),
      tap(event => {
        if (event) {
          this.stateAnim = 'initial'
        }
      }),
      switchMap(event => {
        return of(event).pipe(
          delay(event ? 3000 : 0)
        )
      }),
    ).subscribe(_ => {
      this.isSuccessRegistration = null
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
    this._channelResultRegistrationSub?.unsubscribe()
  }

  onSignUp() {
    if (
      this.form.valid &&
      this.isSuccessValidationName &&
      this.isSuccessValidationEmail &&
      this.isSuccessValidationPassword
    ) {
      this.isProcessRegistration = true
      this.stateAnim = 'expanded'
      this._registrationUseCase.registration(new RegistrationCommand(
        new RegistrationData(
          this.form.value.name,
          this.form.value.email,
          this.form.value.password
        )
      ))
    }
  }

  onChangeName() {
    this._validationUseCase.validate(new ValidationNameCommand(this.form.get('name')?.value))
  }

  onChangeEmail() {
    this._validationUseCase.validate(new ValidationEmailCommand(this.form.get('email')?.value))
  }

  onChangePassword() {
    this._validationUseCase.validate(new ValidationPasswordCommand(this.form.get('password')?.value))
  }

}
