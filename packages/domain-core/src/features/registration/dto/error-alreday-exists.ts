export class ErrorAlreadyExists {
  constructor(
    readonly message = `User with this email address already exists`
  ) {}
}