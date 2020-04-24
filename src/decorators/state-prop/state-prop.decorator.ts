import { clone } from 'clone';

export function StateProp<T, P>(initialValue?: P) {
  return function(target: T, key: string): any {
    const setKey = Symbol();

    return {
      enumerable: true,
      get(): P {
        if (this[setKey] === undefined && initialValue !== undefined) {
          this[setKey] = initialValue;
          this.values[key] = initialValue;
        }

        return clone(this[setKey]);
      },
      set(value: P) {
        this.values[key] = clone(value);
        this[setKey] = clone(value);
      }
    };
  };
}
