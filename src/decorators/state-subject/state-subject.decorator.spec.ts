import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { State } from '../../state';

import { StateSubject } from './state-subject.decorator';

interface TestStateProps {
  test: string;
}

class TestState extends State<TestStateProps> {
  @StateSubject<TestState, string>()
    test: string;
    test$: Observable<string>;

    constructor() {
      super();
    }
}

describe('@StateSubject', () => {
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

  it('should allow synchronous set', async(() => {
    expectedValue = 'set synchronously';

    state.test$
      .pipe(take(1))
      .subscribe(newValue => {
        expect(newValue).toEqual(expectedValue);
      });

    state.test = expectedValue;
  }));

  it('should emit from the subject on set', async(() => {
    expectedValue = 'a new value';

    state.test$
      .pipe(take(1))
      .subscribe(testValue => {
        expect(testValue).toEqual(expectedValue);
      });

    state.set('test', expectedValue);
  }));

});
