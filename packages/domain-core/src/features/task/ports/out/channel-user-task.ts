import { Task } from "../../types/task";

export interface ChannelUserTask {
  emit(tasks: Task[]): void
}