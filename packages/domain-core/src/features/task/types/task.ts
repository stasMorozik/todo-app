export class Task {
  constructor(
    readonly title: string,
    readonly desc: string,
    readonly id: number,
    readonly idUser: number
  ){}
}