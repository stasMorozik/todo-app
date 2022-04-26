import { Task } from "../../types/task";

export interface SelectTaskStoreData {
  select(): Promise<Task[]>
}