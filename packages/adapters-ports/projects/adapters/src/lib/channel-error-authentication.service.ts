import { Injectable } from '@angular/core';
import { ChannelErrorAuthentication, ErrorAuthentication } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelErrorAuthenticationService implements ChannelErrorAuthentication {
  constructor(
    private readonly _channel: Subject<ErrorAuthentication | null>
  ) { }

  emit(e: ErrorAuthentication | null): void {
    this._channel.next(e)
  }
}
