export class State<T> {
  set<K extends keyof T>(prop: K, value: T[K]): void {
    this[prop as string] = value;
  }
}
