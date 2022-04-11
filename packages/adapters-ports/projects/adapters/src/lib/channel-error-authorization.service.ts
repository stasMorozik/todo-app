import { Injectable } from '@angular/core';
import { ChannelErrorAuthorization, ErrorAuthorization } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelErrorAuthorizationService implements ChannelErrorAuthorization {
  constructor(
    private readonly _channel: Subject<ErrorAuthorization | null>
  ) { }
  
  emit(e: ErrorAuthorization | null): void {
    this._channel.next(e)
  }
}
