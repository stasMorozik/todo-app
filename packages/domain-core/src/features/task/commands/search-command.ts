export class SearchCommand {
  readonly title: string
  constructor(
    readonly token: string,
    title: string
  ){
    this.title = title.trim()
  }
}