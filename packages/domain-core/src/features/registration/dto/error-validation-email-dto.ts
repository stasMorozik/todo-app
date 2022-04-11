export class ErrorValidationEmailDto {
  constructor(
    readonly message = `You have entred the wrong email address`
  ) {}
}