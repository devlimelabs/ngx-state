import { Subject } from 'rxjs';
import { clone } from '../../clone';

export function StateSubject<T, P>() {
  return function(target: T, key: string): any {
    const subjectKey = Symbol();
    const observableKey = `${key}$`;

    function getSubject(instance: T): Subject<P> {
      if (!instance[subjectKey]) {
        instance[subjectKey] = new Subject<P>();
      }

      return instance[subjectKey];
    }

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      get() {
        return getSubject(this).asObservable();
      }
    });

    return {
      enumerable: true,
      get() {
        return clone(this.values[key]);
      },
      set(value: P): void {
        this.values[key] = value;
        getSubject(this).next(clone<P>(value));
      },
    };
  };
}
