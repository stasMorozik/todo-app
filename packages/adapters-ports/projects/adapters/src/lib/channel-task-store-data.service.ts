import { Injectable } from '@angular/core';
import { ChannelTaskStoreData, Task } from 'domain-core';
import { actionExchangeTasks, EchoState } from './state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ChannelTaskStoreDataService implements ChannelTaskStoreData {
  constructor(
    private readonly _store: Store<EchoState>
  ) {}

  emit(tasks: Task[]): void {
    this._store.dispatch(actionExchangeTasks({tasks}))
  }
}
