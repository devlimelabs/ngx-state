import { clone } from '../../clone';
import { ReplaySubject } from 'rxjs';

export function StateReplay<T, P>(replayLength = 1) {
  return function(target: T, key: string) {
    const replaySubjectKey = `_${key}`;
    const observableKey = `${key}$`;

    Object.defineProperty(target, replaySubjectKey, {
      value: new ReplaySubject<P>(replayLength)
    });

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      value: target[replaySubjectKey].asObservable()
    });

    Object.defineProperty(target, key, {
      set: (value: P): void => target[replaySubjectKey].next(clone<P>(value))
    });
  };
}
