import { clone } from 'clone';
import { ReplaySubject } from 'rxjs';

export function StateReplay<T, P>(replayLength = 1) {
  return function(target: T, key: string): any {
    const replaySubjectKey = Symbol();
    const observableKey = `${key}$`;

    function getReplaySubject(instance: T): ReplaySubject<P> {
      if (!instance[replaySubjectKey]) {
        instance[replaySubjectKey] = new ReplaySubject<P>(replayLength);
      }

      return instance[replaySubjectKey];
    }

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      get() {
        return getReplaySubject(this).asObservable();
      }
    });

    return {
      enumerable: true,
      get() {
        return clone(this.values[key]);
      },
      set(value: P): void {
        this.values[key] = value;
        getReplaySubject(this).next(clone(value));
      }
    };
  };
}
