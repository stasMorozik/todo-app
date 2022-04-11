import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { StoreModule, Store } from '@ngrx/store';
import { 
  usersReducer, 
  ChannelErrorRegistrationService,
  ChannelUserStoreDataService,
  ChannelSuccessRegistrationService,
  SelectUserStoreDataService,
  ChannelResultValidationService
} from 'adapters';

import {
  ErrorAlreadyExists,
  ErrorValidationEmailDto,
  ErrorValidationNameDto,
  ErrorValidationPasswordDto,
  RegistrationUseCase, 
  SuccessValidationEmailDto, 
  SuccessValidationNameDto, 
  SuccessValidationPasswordDto, 
  User
} from 'domain-core';
import { Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

const channelSuccessRegistration = new Subject<User | null>()
const channelErrorRegistration = new Subject<ErrorAlreadyExists | null>()
const channelResultValidation = new Subject<
  ErrorValidationNameDto       | 
  ErrorValidationEmailDto      | 
  ErrorValidationPasswordDto   | 
  SuccessValidationEmailDto    | 
  SuccessValidationNameDto     | 
  SuccessValidationPasswordDto | 
  null
>() 

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    StoreModule.forFeature('state', usersReducer),
    ReactiveFormsModule
  ],
  providers: [
    Store,
    {
      provide: ChannelUserStoreDataService,
      useClass: ChannelUserStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: SelectUserStoreDataService,
      useClass: SelectUserStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: ChannelSuccessRegistrationService,
      useFactory: () => {
        return new ChannelSuccessRegistrationService(channelSuccessRegistration)
      }
    },
    {
      provide: ChannelErrorRegistrationService,
      useFactory: () => {
        return new ChannelErrorRegistrationService(channelErrorRegistration)
      }
    },
    {
      provide: ChannelResultValidationService,
      useFactory: () => {
        return new ChannelResultValidationService(channelResultValidation)
      }
    },
    {
      provide: RegistrationUseCase,
      useClass: RegistrationUseCase,
      deps: [
        ChannelSuccessRegistrationService,
        ChannelUserStoreDataService,
        SelectUserStoreDataService,
        ChannelErrorRegistrationService,
        ChannelResultValidationService
      ]
    },
    {
      provide: 'CHANNEL_SUCCESS_REGISTRATION',
      useValue: channelSuccessRegistration
    },
    {
      provide: 'CHANNEL_ERROR_REGISTRATION',
      useValue: channelErrorRegistration
    },
    {
      provide: 'CHANNEL_RESULT_VALIDATION',
      useValue: channelResultValidation
    }
  ]
})
export class SignUpModule {}
