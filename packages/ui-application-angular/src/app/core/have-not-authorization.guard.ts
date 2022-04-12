import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthorizationCommand, AuthorizationUseCase, ErrorAuthorization, SuccessDeAuthorizationDto, User } from 'domain-core';
import { Observable, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaveNotAuthorizationGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authorizationUseCase: AuthorizationUseCase,

    @Inject('CHANNEL_RESULT_ATHORIZATION') 
      private readonly _channelResultAuthorization: Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>,
  ){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = window.localStorage.getItem('token')
    this._authorizationUseCase.authorization(new AuthorizationCommand(token ? token : ``))
    return this._channelResultAuthorization.pipe(
      switchMap(ev => {
        if (ev instanceof ErrorAuthorization) {
          return of(true)
        }
        return of(this._router.createUrlTree(['/main']))
      })
    )
  }
  
}
