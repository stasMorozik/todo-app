import { Injectable } from '@angular/core';
import { ChannellSuccessRegistration, User } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelSuccessRegistrationService implements ChannellSuccessRegistration {
  constructor(
    private readonly _channel: Subject<User | null>
  ) { }
  
  emit(user: User | null): void {
    this._channel.next(user)
  }
}
