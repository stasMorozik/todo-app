import { Injectable } from '@angular/core';
import { ChannelResultRegistration, ErrorAlreadyExists, User } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelResultRegistrationService implements ChannelResultRegistration {

  constructor(
    private readonly _channel: Subject<User | ErrorAlreadyExists | null>
  ) { }

  emit(e: User | ErrorAlreadyExists | null): void {
    this._channel.next(e)
  }
}
