import { clone } from 'clone';
import { BehaviorSubject } from 'rxjs';
import { State } from '../../state';

export function StateBehavior<T extends State<T>, P>(initialValue: P = null) {
  return function(target: T, key: string): any {
    const behaviorSubjectKey = Symbol();
    const observableKey = `${key}$`;

    function getBehaviorSubject(instance: T): BehaviorSubject<P> {
      if (!instance[behaviorSubjectKey]) {
        instance['values'][behaviorSubjectKey] = initialValue;
        instance[behaviorSubjectKey] = new BehaviorSubject<P>(initialValue);
      }

      return instance[behaviorSubjectKey];
    }

    Object.defineProperty(target, observableKey, {
      enumerable: true,
      get() {
        return getBehaviorSubject(this).asObservable();
      },
    });

    return {
      enumerable: true,
      get() {
        return clone(this.values[key]);
      },
      set(value: P) {
        this.values[key] = value;
        getBehaviorSubject(this).next(clone(value));
      },
    };
  };
}
