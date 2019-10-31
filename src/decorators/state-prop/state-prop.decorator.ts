import { clone } from 'lodash';

export function StateProp<T, P>(initialValue?: P) {
  return function(target: T, key: string) {
    const privateKey = `_${key}`;

    Object.defineProperty(target, privateKey, {
      writable: true,
      value: initialValue
    });

    Object.defineProperty(target, key, {
      enumerable: true,
      get: (): P => clone(target[privateKey]),
      set: (value: P) => (target[privateKey] = clone(value))
    });
  };
}
