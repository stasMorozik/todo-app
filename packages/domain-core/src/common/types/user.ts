export type UID = number

export class User {
  constructor(
    readonly uid: UID,
    readonly name: string,
    readonly email: string,
    readonly password?: string
  ){}
}