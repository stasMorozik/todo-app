import { Injectable } from '@angular/core';
import { ChannelResultAuthorization, ErrorAuthorization, User, SuccessDeAuthorizationDto } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelResultAuthorizationService implements ChannelResultAuthorization {
  constructor(
    private readonly _channel: Subject<ErrorAuthorization | SuccessDeAuthorizationDto | User | null>
  ) { }
  
  emit(e: ErrorAuthorization | User | null): void {
    this._channel.next(e)
  }
}
