import { Either, left, right } from '@sweet-monads/either';
import { ErrorValidationNameDto } from '../dto/error-validation-name-dto';

export class ValidateName {
  constructor(
    readonly name: string
  ) {}

  validate(): Either<ErrorValidationNameDto, string> {
    if (this.name.length < 2) {
      return left(new ErrorValidationNameDto())
    }

    if (this.name.match(/[0-9_!@#$%^&*()=-_+~`,.\/\\?;:\]\[{}]/)) {
      return left(new ErrorValidationNameDto())
    }

    return right(this.name)
  }
}