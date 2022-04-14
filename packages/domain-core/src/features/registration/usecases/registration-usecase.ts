import { RegistrationCommand } from "../commands/registration-command";
import { ErrorAlreadyExists } from "../dto/error-alreday-exists";
import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { ChannelUserStoreData } from "../ports/out/channel-user-store-data";
import { ValidateEmail } from "../rules/validate-email";
import { ValidatePassword } from "../rules/validate-password";
import { ValidateName } from "../rules/vlidate-name";
import { User } from "../types";
import { ValidationPasswordCommand } from "../commands/validation-password-command";
import { ValidationNameCommand } from "../commands/validation-name-command";
import { ValidationEmailCommand } from "../commands/validation-email-command";
import { ChannelResultValidation } from "../ports/out/channel-result-validation";
import { SuccessValidationPasswordDto } from "../dto/success-validation-password-dto";
import { SuccessValidationNameDto } from "../dto/success-validation-name-dto";
import { SuccessValidationEmailDto } from "../dto/success-validation-email-dto";
import { ChannelResultRegistration } from "../ports/out/channel-result-registration";

export class RegistrationUseCase {
  constructor(
    private readonly _channelResultRegistration: ChannelResultRegistration,
    private readonly _channelUserStoreData: ChannelUserStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelResultValidation: ChannelResultValidation
  ) {}

  registration(
    command: RegistrationCommand | 
    ValidationPasswordCommand |
    ValidationNameCommand |
    ValidationEmailCommand 
  ) {
    if (command instanceof RegistrationCommand) {
      const validateEmail = new ValidateEmail(command.registrationData.email)
      const validateName = new ValidateName(command.registrationData.name)
      const validatePassword = new ValidatePassword(command.registrationData.password)

      const resultValidateEmail = validateEmail.validate()
      if (resultValidateEmail.isLeft()) {
        resultValidateEmail.mapLeft(err => this._channelResultValidation.emit(err))
      }

      const resultValidateName = validateName.validate()
      if (resultValidateName.isLeft()) {
        resultValidateName.mapLeft(err => this._channelResultValidation.emit(err))
      }
      
      const resultValidatePassword = validatePassword.validate()
      if (resultValidatePassword.isLeft()) {
        resultValidatePassword.mapLeft(err => this._channelResultValidation.emit(err))
      }

      if (
        resultValidatePassword.isRight() &&
        resultValidateName.isRight() &&
        resultValidateName.isRight()
      ) {
        this._selectUserStoreData.select().then(r => {
          if (r.find(user => user.email == command.registrationData.email)) {
            this._channelResultRegistration.emit(new ErrorAlreadyExists())
          } else {
            this._channelResultRegistration.emit(new User(r.length,command.registrationData.name,command.registrationData.email))
            this._channelUserStoreData.emit([...r, new User(r.length,command.registrationData.name,command.registrationData.email, command.registrationData.password)])
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }

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