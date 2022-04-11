import { Either, left, right } from '@sweet-monads/either';
import { ErrorValidationEmailDto } from '../dto/error-validation-email-dto';

export class ValidateEmail {
  constructor(
    readonly email: string 
  ) {}

  validate(): Either<ErrorValidationEmailDto, string> {
    if (!this.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return left(new ErrorValidationEmailDto())
    }

    return right(this.email)
  }
}