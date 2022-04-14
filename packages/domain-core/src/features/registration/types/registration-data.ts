
export class RegistrationData {
  readonly name: string
  readonly email: string
  readonly password: string
  constructor(
    name: string,
    email: string,
    password: string
  ){
    this.name = name.trim()
    this.email = email.trim()
    this.password = password.trim()
  }
}