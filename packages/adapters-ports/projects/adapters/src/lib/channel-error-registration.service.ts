import { Injectable } from '@angular/core';
import { ChannelErrorRegistration, ErrorAlreadyExists} from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelErrorRegistrationService implements ChannelErrorRegistration {
  constructor(
    private readonly _channel: Subject<ErrorAlreadyExists | null>
  ) { }

  emit(e: ErrorAlreadyExists | null): void {
    this._channel.next(e)
  }
}
