import { Injectable } from '@angular/core';
import { ChannelResultValidation, ErrorValidationEmailDto, ErrorValidationNameDto, ErrorValidationPasswordDto, SuccessValidationEmailDto, SuccessValidationNameDto, SuccessValidationPasswordDto } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelResultValidationService implements ChannelResultValidation {

  constructor(
    private readonly _channel: Subject<
      ErrorValidationNameDto | 
      ErrorValidationEmailDto      | 
      ErrorValidationPasswordDto   | 
      SuccessValidationEmailDto    | 
      SuccessValidationNameDto     | 
      SuccessValidationPasswordDto | 
      null
    >
  ) { }

  emit(e: 
    ErrorValidationNameDto | 
    ErrorValidationEmailDto      | 
    ErrorValidationPasswordDto   | 
    SuccessValidationEmailDto    | 
    SuccessValidationNameDto     | 
    SuccessValidationPasswordDto | 
    null
  ): void {
    this._channel.next(e)
  }
}
