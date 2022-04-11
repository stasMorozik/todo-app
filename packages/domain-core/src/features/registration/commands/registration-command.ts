import { RegitrationData } from "../types/registration-data";

export class RegistrationCommand {
  constructor(
    readonly data: RegitrationData
  ){}
}