import { Injectable } from '@angular/core';
import { ChannelResultAuthentication, ErrorAuthentication, Token } from 'domain-core'
import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ChannelResultAuthenticationService implements ChannelResultAuthentication {
  constructor(
    private readonly _channel: Subject<ErrorAuthentication | Token | null>
  ) { }
  
  emit(e: ErrorAuthentication | Token | null): void {
    this._channel.next(e)
  }
}
