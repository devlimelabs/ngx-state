import { clone } from 'clone';

export class State<T> {
  private values: Partial<T>;

  get<K extends keyof T>(prop: K): T[K] {
    return clone(this.values[prop]);
  }

  set<K extends keyof T>(prop: K, value: T[K]): void {
    this[prop as string] = value;
  }

  constructor() {
    this.values = {}
  }
}
