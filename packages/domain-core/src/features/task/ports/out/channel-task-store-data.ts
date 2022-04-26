import { Task } from "../../types/task";

export interface ChannelTaskStoreData {
  emit(tasks: Task[]): void
}