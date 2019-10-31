import { clone } from 'lodash';
import { Subject } from 'rxjs';

export function StateSubject<T, P>() {
  return function(target: T, key: string) {
    const subjectKey = `_${key}`;
    const observableKey = `${key}$`;

    Object.defineProperty(target, subjectKey, {
      value: new Subject<P>()
    });

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      value: target[subjectKey].asObservable()
    });

    Object.defineProperty(target, key, {
      set: (value: P): void => target[subjectKey].next(clone(value))
    });
  };
}