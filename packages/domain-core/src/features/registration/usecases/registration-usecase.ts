import { RegistrationCommand } from "../commands/registration-command";
import { ErrorAlreadyExists } from "../dto/error-alreday-exists";
import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { ChannelErrorRegistration } from "../ports/out/channel-error-regitration";
import { ChannelUserStoreData } from "../ports/out/channel-user-store-data";
import { ChannellSuccessRegistration } from "../ports/out/channel-success-registration";
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

export class RegistrationUseCase {
  constructor(
    private readonly _channellSuccessRegistration: ChannellSuccessRegistration,
    private readonly _channelUserStoreData: ChannelUserStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelError: ChannelErrorRegistration,
    private readonly _channelResultValidation: ChannelResultValidation
  ) {}

  registration(
    command: RegistrationCommand | 
    ValidationPasswordCommand |
    ValidationNameCommand |
    ValidationEmailCommand 
  ) {
    if (command instanceof RegistrationCommand) {
      const validateEmail = new ValidateEmail(command.data.email)
      const validateName = new ValidateName(command.data.name)
      const validatePassword = new ValidatePassword(command.data.password)

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
          if (
            r.find(user => user.email == command.data.email)
          ) {
            this._channelError.emit(new ErrorAlreadyExists())
          } else {
            const newUser = new User(r.length,command.data.name,command.data.email)
            this._channellSuccessRegistration.emit(newUser)
            this._channelUserStoreData.emit([...r, newUser])
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