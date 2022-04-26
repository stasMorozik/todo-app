export class CreateCommand {
  constructor(
    readonly token: string,
    readonly title: string,
    readonly desc?: string
  ){}
}