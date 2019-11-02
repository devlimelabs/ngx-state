import { clone } from '../../clone';

export function StateProp<T, P>(initialValue: P = null) {
  return function(target: T, key: string) {
    const privateKey = `_${key}`;

    Object.defineProperty(target, privateKey, {
      writable: true,
      value: initialValue
    });

    Object.defineProperty(target, key, {
      enumerable: true,
      get: (): P => clone<P>(target[privateKey]),
      set: (value: P) => target[privateKey] = clone<P>(value)
    });
  };
}
