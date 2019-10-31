import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { State } from '../../state';

import { StateBehavior } from './state-behavior.decorator';

const initialValue = 'someInitValue';

interface TestStateProps {
  test: string;
}

class TestState1 extends State<TestStateProps> {
  @StateBehavior<TestState1, string>()
    test: string;
    test$: Observable<string>;

    constructor() {
      super();
    }
}

class TestState extends State<TestStateProps> {
  @StateBehavior<TestState, string>(initialValue)
    test: string;
    test$: Observable<string>;

    constructor() {
      super();
    }
}

describe('@StateBehavior', () => {
  let state: TestState;
  let expectedValue: string;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
    expectedValue = null;
  });

  it('should create the public property and default to inital value of null', async(() => {
    state = new TestState1();
    state.test$
      .pipe(take(1))
      .subscribe((newValue) => {
        expect(newValue).toBeNull();
      });
  }));

  it('should create the public property with initialValue when provided', async(() => {
    state.test$
      .pipe(take(1))
      .subscribe((newValue) => {
        expect(newValue).toEqual(initialValue);
      });
  }));

  it('should create an observable version of the value', async(() => {
    expect(state.test$ instanceof Observable).toBeTruthy();
    state.test$
      .pipe(take(1))
      .subscribe(value => expect(value).toEqual(initialValue));
  }));

  it('should allow synchronous set', async(() => {
    expectedValue = 'set synchronously';

    state.test$
      .pipe(
        skip(1),
        take(1)
      )
      .subscribe(newValue => {
        expect(newValue).toEqual(expectedValue);
      });

    state.test = expectedValue;
  }));

  it('should emit from the behavior subject on set', async(() => {
    expectedValue = 'a new value';

    state.test$
      .pipe(
        skip(1),
        take(1)
      )
      .subscribe(testValue => {
        expect(testValue).toEqual(expectedValue);
      });

    state.set('test', expectedValue);
  }));
});
