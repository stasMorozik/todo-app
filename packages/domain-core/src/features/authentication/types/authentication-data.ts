export class AuthenticationData {
  readonly email: string
  readonly password: string
  constructor(
    email: string,
    password: string
  ){
    this.email = email.trim()
    this.password = password.trim()
  }
}