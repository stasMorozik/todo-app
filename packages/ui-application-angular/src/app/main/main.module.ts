import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChannelResultAuthorizationService, ChannelTokenStoreDataService, SelectTokenStoreDataService, SelectUserStoreDataService } from 'adapters';
import { ErrorAuthorization, User, AuthorizationUseCase, SuccessDeAuthorizationDto } from 'domain-core';

const channelResultAuthorization = new Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>()

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers:[
    Store,
    {
      provide: SelectUserStoreDataService,
      useClass: SelectUserStoreDataService,
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
      provide: ChannelTokenStoreDataService,
      useClass: ChannelTokenStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: ChannelResultAuthorizationService,
      useFactory: () => {
        return new ChannelResultAuthorizationService(channelResultAuthorization)
      }
    },
    {
      provide: AuthorizationUseCase,
      useClass: AuthorizationUseCase,
      deps: [
        SelectTokenStoreDataService,
        SelectUserStoreDataService,
        ChannelTokenStoreDataService,
        ChannelResultAuthorizationService
      ]
    },
    {
      provide: 'CHANNEL_RESULT_ATHORIZATION',
      useValue: channelResultAuthorization
    },
  ]
})
export class MainModule { }
