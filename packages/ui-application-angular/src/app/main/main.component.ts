import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AuthorizationCommand, 
  AuthorizationUseCase, 
  DeAuthorizationCommand, 
  ErrorAuthorization, 
  SuccessDeAuthorizationDto, 
  User, 
  Task, 
  ErrorCreatingTaskDto, 
  ErrorRemovingTaskDto, 
  ErrorExecutingTaskDto, 
  ListUseCase, 
  ListCommand, 
  CreateUseCase, 
  RemoveUseCase, 
  ExecuteUseCase
} from 'domain-core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  userName: string | null = null

  token: string

  constructor(
    private _router: Router,
    private readonly _authorizationUseCase: AuthorizationUseCase,
    private readonly _listUseCase: ListUseCase,
    private readonly _createUseCase: CreateUseCase,
    private readonly _removeUseCase: RemoveUseCase,
    private readonly _executeUseCase: ExecuteUseCase,

    @Inject('CHANNEL_RESULT_ATHORIZATION') 
      private readonly _channelResultAuthorization: Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>,

    @Inject('CHANNEL_USER_TASK')
      public channelUserTask: BehaviorSubject<Task[]>,

    @Inject('CHANNEL_RESULT_CHANGE_TASKS')
      public channelResultChangeTasks: Subject<ErrorCreatingTaskDto | ErrorRemovingTaskDto | ErrorExecutingTaskDto>
  ) {
    const token = window.localStorage.getItem('token')
    this.token = token ? token : ``
  }
  
  ngOnInit(): void {
    this._authorizationUseCase.authorization(new AuthorizationCommand(this.token))
    this._listUseCase.list(new ListCommand(this.token))
    this._channelResultAuthorization.subscribe(event => {
      if (event instanceof User) {
        this.userName = event.name
      }
      if (event instanceof SuccessDeAuthorizationDto) {
        this._router.navigate(['/sign-in'])
      }
    })
  }

  ngOnDestroy(): void {}

  onExit() {
    this._authorizationUseCase.authorization(new DeAuthorizationCommand(this.token))
  }

}
