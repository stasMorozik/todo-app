import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'todo-ui-components';

import { 
  ChannelUserStoreDataService,
  SelectUserStoreDataService,
  ChannelResultValidationService,
  ChannelResultRegistrationService
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

const channelResultRegistration = new Subject<User | ErrorAlreadyExists | null>()

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
    ReactiveFormsModule,
    ButtonModule
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
      provide: ChannelResultValidationService,
      useFactory: () => {
        return new ChannelResultValidationService(channelResultValidation)
      }
    },
    {
      provide: ChannelResultRegistrationService,
      useFactory: () => {
        return new ChannelResultRegistrationService(channelResultRegistration)
      }
    },
    {
      provide: RegistrationUseCase,
      useClass: RegistrationUseCase,
      deps: [
        ChannelResultRegistrationService,
        ChannelUserStoreDataService,
        SelectUserStoreDataService,
        ChannelResultValidationService
      ]
    },
    {
      provide: 'CHANNEL_RESULT_REGISTRATION',
      useValue: channelResultRegistration
    },
    {
      provide: 'CHANNEL_RESULT_VALIDATION',
      useValue: channelResultValidation
    }
  ]
})
export class SignUpModule {}
