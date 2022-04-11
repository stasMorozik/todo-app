import { ErrorValidationEmailDto } from "../../dto/error-validation-email-dto";
import { ErrorValidationNameDto } from "../../dto/error-validation-name-dto";
import { ErrorValidationPasswordDto } from "../../dto/error-validation-password-dto";
import { SuccessValidationEmailDto } from "../../dto/success-validation-email-dto";
import { SuccessValidationNameDto } from "../../dto/success-validation-name-dto";
import { SuccessValidationPasswordDto } from "../../dto/success-validation-password-dto";

export interface ChannelResultValidation {
  emit(e: 
    ErrorValidationNameDto       | 
    ErrorValidationEmailDto      | 
    ErrorValidationPasswordDto   |
    SuccessValidationEmailDto    |
    SuccessValidationNameDto     |
    SuccessValidationPasswordDto |  
    null
  ): void
}