import { OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';

export class State<T> implements OnDestroy {
  protected scvngr = new Scavenger(this);

  set<K extends keyof T>(prop: K, value: T[K]): void {
    this[prop as string] = value;
  }

  ngOnDestroy() {}
}
