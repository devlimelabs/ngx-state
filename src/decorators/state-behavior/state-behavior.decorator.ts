import { clone } from '../../clone';
import { BehaviorSubject } from 'rxjs';

export function StateBehavior<T, P>(initialValue: P = null) {
  return function(target: T, key: string) {
    const behaviorSubjectKey = `_${key}`;
    const observableKey = `${key}$`;

    Object.defineProperty(target, behaviorSubjectKey, {
        value: new BehaviorSubject<P>(initialValue)
    });

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      value: target[behaviorSubjectKey].asObservable()
    });

    Object.defineProperty(target, key, {
        set: (value: P): void => target[behaviorSubjectKey].next(clone<P>(value))
    });
  };
}
