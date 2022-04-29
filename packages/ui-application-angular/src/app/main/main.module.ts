import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { 
  ChannelResultAuthorizationService, 
  ChannelTokenStoreDataService, 
  SelectTokenStoreDataService, 
  SelectUserStoreDataService,
  ChannelUserTaskService,
  SelectTaskStoreDataService,
  ChannelResultChangeTasksService,
  ChannelTaskStoreDataService
} from 'adapters';
import { 
  ErrorAuthorization, 
  User, 
  AuthorizationUseCase, 
  SuccessDeAuthorizationDto,
  ListUseCase,
  CreateUseCase,
  ErrorCreatingTaskDto,
  ErrorRemovingTaskDto,
  ErrorExecutingTaskDto,
  RemoveUseCase,
  Task,
  ExecuteUseCase
} from 'domain-core';
import { ReactiveFormsModule } from '@angular/forms';

const channelResultAuthorization = new Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>()
const channelUserTask = new BehaviorSubject<Task[]>([])
const channelResultChangeTasks = new Subject<ErrorCreatingTaskDto | ErrorRemovingTaskDto | ErrorExecutingTaskDto>()

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
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
      provide: SelectTaskStoreDataService,
      useClass: SelectTaskStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: ChannelUserTaskService,
      useFactory: () => {
        return new ChannelUserTaskService(channelUserTask)
      },
    },
    {
      provide: ListUseCase,
      useClass: ListUseCase,
      deps: [
        ChannelUserTaskService,
        SelectTaskStoreDataService,
        SelectTokenStoreDataService,
        SelectUserStoreDataService
      ]
    },
    {
      provide: ChannelResultChangeTasksService,
      useFactory: () => {
        return new ChannelResultChangeTasksService(channelResultChangeTasks)
      }
    },
    {
      provide: ChannelTaskStoreDataService,
      useClass: ChannelTaskStoreDataService,
      deps: [
        Store
      ]
    },
    {
      provide: CreateUseCase,
      useClass: CreateUseCase,
      deps: [
        ChannelUserTaskService,
        SelectTaskStoreDataService,
        SelectTokenStoreDataService,
        SelectUserStoreDataService,
        ChannelTaskStoreDataService,
        ChannelResultChangeTasksService
      ]
    },
    {
      provide: RemoveUseCase,
      useClass: RemoveUseCase,
      deps: [
        ChannelUserTaskService,
        SelectTaskStoreDataService,
        SelectTokenStoreDataService,
        SelectUserStoreDataService,
        ChannelTaskStoreDataService,
        ChannelResultChangeTasksService
      ]
    },
    {
      provide: ExecuteUseCase,
      useClass: ExecuteUseCase,
      deps: [
        ChannelUserTaskService,
        SelectTaskStoreDataService,
        SelectTokenStoreDataService,
        SelectUserStoreDataService,
        ChannelTaskStoreDataService,
        ChannelResultChangeTasksService
      ]
    },
    {
      provide: 'CHANNEL_RESULT_ATHORIZATION',
      useValue: channelResultAuthorization
    },
    {
      provide: 'CHANNEL_USER_TASK',
      useValue: channelUserTask
    },
    {
      provide: 'CHANNEL_RESULT_CHANGE_TASKS',
      useValue: channelResultChangeTasks
    }
  ]
})
export class MainModule { }
