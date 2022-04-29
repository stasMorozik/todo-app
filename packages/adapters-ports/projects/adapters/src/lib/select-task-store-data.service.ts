import { Injectable } from '@angular/core';
import { SelectTaskStoreData, Task } from 'domain-core';
import { createSelector, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { select, Selector } from './state';

export const tasks = createSelector(
  select,
  (state) => state.state.tasks
)

@Injectable({
  providedIn: 'root'
})
export class SelectTaskStoreDataService implements SelectTaskStoreData {

  constructor(
    private readonly _store: Store<Selector>
  ) {}

  select(): Promise<Task[]> {
    return this._store.select(tasks).pipe(first()).toPromise() as Promise<Task[]>
  }
}
