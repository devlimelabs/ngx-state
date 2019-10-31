import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { State } from '../../state';

import { StateReplay } from './state-replay.decorator';

interface TestStateProps {
  test: string;
}

class TestState1 extends State<TestStateProps> {
  @StateReplay<TestState, string>(3)
    test: string;
    test$: Observable<string>;

    constructor() {
      super();
    }
}

class TestState extends State<TestStateProps> {
  @StateReplay<TestState, string>()
  test: string;
  test$: Observable<string>;

  constructor() {
    super();
  }
}

describe('@StateReplay', () => {
  let state: TestState;
  let expectedValue: string;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
    expectedValue = null;
  });

  it('should create an observable version of the value', async(() => {
    expect(state.test$ instanceof Observable).toBeTruthy();
  }));

  it('apply replay length to ReplaySubject', async(() => {
    state = new TestState1();
    expectedValue = 'value 2';

    state.test = 'value 1';
    state.test = 'value 2';
    state.test = 'value 3';
    state.test = 'value 4';

    state.test$
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual(expectedValue);
      });
  }));

  it('should allow synchronous set', async(() => {
    expectedValue = 'set synchronously';

    state.test$
      .pipe(take(1))
      .subscribe(newValue => {
        expect(newValue).toEqual(expectedValue);
      });

    state.test = expectedValue;
  }));

  it('should emit from the replay subject on set', async(() => {
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
