import { Injectable } from '@angular/core';
import { ChannelUserTask, Task } from 'domain-core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelUserTaskService implements ChannelUserTask {

  constructor(
    private readonly _channel: BehaviorSubject<Task[]>
  ) { }

  emit(tasks: Task[]): void {
    this._channel.next(tasks)
  }
}
