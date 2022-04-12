import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { 
  SelectUserStoreDataService,
  SelectTokenStoreDataService,
  ChannelTokenStoreDataService,
  ChannelResultAuthenticationService
} from 'adapters';

import { 
  AuthenticationUseCase, 
  ErrorAuthentication, 
  Token
} from 'domain-core';


const channelResultAuthentication = new Subject<ErrorAuthentication | Token | null>()

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    Store,
    {
      provide: SelectUserStoreDataService,
      useClass: SelectUserStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: ChannelTokenStoreDataService,
      useClass: ChannelTokenStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: SelectTokenStoreDataService,
      useClass: SelectTokenStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: ChannelResultAuthenticationService,
      useFactory: () => {
        return new ChannelResultAuthenticationService(channelResultAuthentication)
      }
    },
    {
      provide: AuthenticationUseCase,
      useClass: AuthenticationUseCase,
      deps: [
        SelectUserStoreDataService,
        SelectTokenStoreDataService,
        ChannelTokenStoreDataService,
        ChannelResultAuthenticationService
      ]
    },
    {
      provide: 'CHANNEL_RESULT_AUTHENTICATION',
      useValue: channelResultAuthentication
    }
  ]
})
export class SignInModule { }
