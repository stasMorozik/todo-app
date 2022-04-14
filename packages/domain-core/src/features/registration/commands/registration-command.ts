import { RegistrationData } from "../types/registration-data";

export class RegistrationCommand {
  constructor(
    readonly registrationData: RegistrationData
  ){}
}