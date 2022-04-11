import { UID } from "./user";

export class Token {
  constructor(
    readonly token: string,
    readonly date: number,
    readonly uidUser: UID
  ) {}
}