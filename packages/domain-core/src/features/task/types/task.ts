export class Task {
  constructor(
    readonly title: string,
    readonly id: number,
    readonly idUser: number,
    readonly isDone: boolean,
    readonly desc?: string,
  ){}
}