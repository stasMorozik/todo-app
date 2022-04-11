import { Injectable } from '@angular/core';
import { ChannelSuccessAuthorization, User } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelSuccessAuthorizationService implements ChannelSuccessAuthorization {
  constructor(
    private readonly _channel: Subject<User | null>
  ) { }

  emit(user: User | null): void {
    this._channel.next(user)
  }
}
