import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ExecuteUseCase,
  CreateCommand,
  SearchCommand,
  RemoveCommand,
  ExecuteCommand
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

  createForm: FormGroup
  searchForm: FormGroup

  constructor(
    private _fb: FormBuilder,
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

    this.createForm = this._fb.group({
      title: ['', [Validators.required]],
      desc: ['', []],
    })

    this.searchForm = this._fb.group({
      title: ['', [Validators.required]]
    })
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

    this.searchForm.valueChanges.subscribe(r => {
      if (this.searchForm.valid) {
        this._listUseCase.list(new SearchCommand(this.token, this.searchForm.value.title))
      }
      if (!this.searchForm.valid) {
        this._listUseCase.list(new ListCommand(this.token))
      }
    })
  }

  ngOnDestroy(): void {}

  onExit() {
    this._authorizationUseCase.authorization(new DeAuthorizationCommand(this.token))
  }

  onCreate() {
    if(this.createForm.valid) {
      this._createUseCase.create(new CreateCommand(this.token, this.createForm.value.title, this.createForm.value.desc))
    }
  }

  onRemove(id: number) {
    this._removeUseCase.remove(new RemoveCommand(this.token, id))
  }

  onExecute(id: number) {
    this._executeUseCase.execute(new ExecuteCommand(this.token, id))
  }
}
