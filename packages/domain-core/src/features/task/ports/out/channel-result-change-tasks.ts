import { ErrorCreatingTaskDto } from "../../dto/error-creating-task-dto";
import { ErrorExecutingTaskDto } from "../../dto/error-executing-task-dto";
import { ErrorRemovingTaskDto } from "../../dto/error-removing-task-dto";

export interface ChannelResultExchange {
  emit(e: ErrorCreatingTaskDto | ErrorRemovingTaskDto | ErrorExecutingTaskDto): void
}