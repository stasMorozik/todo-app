import { ValidationEmailCommand } from "../commands/validation-email-command";
import { ValidationNameCommand } from "../commands/validation-name-command";
import { ValidationPasswordCommand } from "../commands/validation-password-command";
import { SuccessValidationEmailDto } from "../dto/success-validation-email-dto";
import { SuccessValidationNameDto } from "../dto/success-validation-name-dto";
import { SuccessValidationPasswordDto } from "../dto/success-validation-password-dto";
import { ChannelResultValidation } from "../ports/out/channel-result-validation";
import { ValidateEmail } from "../rules/validate-email";
import { ValidatePassword } from "../rules/validate-password";
import { ValidateName } from "../rules/vlidate-name";

export class ValidationUseCase {
  constructor(
    private readonly _channelResultValidation: ChannelResultValidation
  ){}

  validate(command: 
    ValidationPasswordCommand |
    ValidationNameCommand |
    ValidationEmailCommand 
  ) {
    if (command instanceof ValidationPasswordCommand) {
      const validatePassword = new ValidatePassword(command.password)
      const resultValidatePassword = validatePassword.validate()
      if (resultValidatePassword.isLeft()) {
        resultValidatePassword.mapLeft(err => this._channelResultValidation.emit(err))
      }

      if (resultValidatePassword.isRight()) {
        resultValidatePassword.mapRight(_ => this._channelResultValidation.emit(new SuccessValidationPasswordDto()))
      }
    }

    if (command instanceof ValidationNameCommand) {
      const validateName = new ValidateName(command.name)
      const resultValidateName = validateName.validate()
      if (resultValidateName.isLeft()) {
        resultValidateName.mapLeft(err => this._channelResultValidation.emit(err))
      }

      if (resultValidateName.isRight()) {
        resultValidateName.mapRight(_ => this._channelResultValidation.emit(new SuccessValidationNameDto()))
      }
    }

    if (command instanceof ValidationEmailCommand) {
      const validateEmail = new ValidateEmail(command.email)
      const resultValidateEmail = validateEmail.validate()
      if (resultValidateEmail.isLeft()) {
        resultValidateEmail.mapLeft(err => this._channelResultValidation.emit(err))
      }
      
      if (resultValidateEmail.isRight()) {
        resultValidateEmail.mapRight(_ => this._channelResultValidation.emit(new SuccessValidationEmailDto()))
      }
    }
  }
}