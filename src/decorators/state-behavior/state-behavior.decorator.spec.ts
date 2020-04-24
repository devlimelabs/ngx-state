import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { async, TestBed } from '@angular/core/testing';

describe('@StateBehavior', () => {
  let state: TestState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TestState ]
    });

    state = TestBed.inject(TestState);
  });

  describe('no initial value', () => {
    it('should create the observable and static properties', async(() => {
      expect(state.testBehavior$ instanceof Observable).toBeTruthy();

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(null);
          expect(state.testBehavior).toBeUndefined();
        });
    }));
  });

  describe('initial value', () => {
    it('should create the public, private, and observable properties', async(() => {
      expect(state.testBehaviorDefault$ instanceof Observable).toBeTruthy();

      state.testBehaviorDefault$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('default');
        });
    }));

    it('should emit value set with setter', async(() => {
      state.set('testBehavior', 'new value');
      expect(state.testBehavior).toEqual('new value');

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
        });
    }));
  });

  describe('immutability', () => {
    it('should set a copy of an array', async(() => {
      const setArray = [1, 2, 3];

      state.set('testBehaviorArr', setArray);

      state.testBehaviorArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });
    }));

    it('should get a copy of an array', async(() => {
      const setArray = [1, 2, 3];

      state.set('testBehaviorArr', setArray);

      state.testBehaviorArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });
    }));

    it('should set a copy of an object', async(() => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testBehaviorObj', setObject);

      state.testBehaviorObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });
    }));

    it('should get a copy of an object', async(() => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testBehaviorObj', setObject);

      state.testBehaviorObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });
    }));
  });
});
