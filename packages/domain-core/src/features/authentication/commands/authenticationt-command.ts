import { AuthenticationData } from "../types/authentication-data";

export class AuthenticationCommand {
  constructor(
    readonly authenticationData: AuthenticationData
  ){}
}