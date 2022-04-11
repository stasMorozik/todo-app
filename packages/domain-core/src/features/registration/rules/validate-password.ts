import { Either, left, right } from '@sweet-monads/either';
import { ErrorValidationPasswordDto } from '../dto/error-validation-password-dto';

export class ValidatePassword {
  constructor(
    readonly password: string
  ) {}

  validate(): Either<ErrorValidationPasswordDto, string> {
    if (this.password.length < 6) {
      return left(new ErrorValidationPasswordDto())
    }

    return right(this.password)
  }
}