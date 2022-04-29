import { Injectable } from '@angular/core';
import { ChannelResultChangeTasks, ErrorCreatingTaskDto, ErrorExecutingTaskDto, ErrorRemovingTaskDto } from 'domain-core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelResultChangeTasksService implements ChannelResultChangeTasks {

  constructor(
    private readonly _channel: Subject<ErrorCreatingTaskDto | ErrorRemovingTaskDto | ErrorExecutingTaskDto>
  ) { }

  emit(e: ErrorCreatingTaskDto | ErrorRemovingTaskDto | ErrorExecutingTaskDto): void {
    this._channel.next(e)
  }
}
