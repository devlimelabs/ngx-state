import { clone } from 'clone';

export class State<T> {
  get<K extends keyof T>(prop: K): T[K] {
    return clone(this[prop as string];
  }
  set<K extends keyof T>(prop: K, value: T[K]): void {
    this[prop as string] = value;
  }
}
