import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationCommand, AuthorizationUseCase, DeAuthorizationCommand, ErrorAuthorization, SuccessDeAuthorizationDto, User } from 'domain-core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  userName: string | null = null

  constructor(
    private _router: Router,
    private readonly _authorizationUseCase: AuthorizationUseCase,
    @Inject('CHANNEL_RESULT_ATHORIZATION') 
      private readonly _channelResultAuthorization: Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>,
  ) {
  }
  
  ngOnInit(): void {
    const token = window.localStorage.getItem('token')
    this._authorizationUseCase.authorization(new AuthorizationCommand(token ? token : ``))

    this._channelResultAuthorization.subscribe(event => {
      if (event instanceof User) {
        this.userName = event.name
      }
      if (event instanceof SuccessDeAuthorizationDto) {
        this._router.navigate(['/sign-in'])
      }
    })
  }

  ngOnDestroy(): void {
    
  }

  onExit() {
    const token = window.localStorage.getItem('token')
    this._authorizationUseCase.authorization(new DeAuthorizationCommand(token ? token : ``))
  }

}
