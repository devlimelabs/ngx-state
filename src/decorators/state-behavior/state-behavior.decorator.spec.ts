import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { StateBehavior } from './state-behavior.decorator';

describe('@StateBehavior', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
  });

  describe('no initial value', () => {
    beforeEach(() => {
      StateBehavior()(state, 'testBehavior');
    });

    it('should create the public, private, and observable properties', done => {
      expect(state['_testBehavior'] instanceof BehaviorSubject).toBeTruthy();
      expect(state.testBehavior$ instanceof Observable).toBeTruthy();

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(null);
          done();
        });
    });

    it('should emit value set with setter', done => {
      state['testBehavior'] = 'new value';

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          done();
        });
    });
  });

  describe('initial value', () => {
    beforeEach(() => {
      StateBehavior('initial value')(state, 'testBehavior');
    });

    it('should create the public, private, and observable properties', done => {
      expect(state['_testBehavior'] instanceof BehaviorSubject).toBeTruthy();
      expect(state.testBehavior$ instanceof Observable).toBeTruthy();

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('initial value');
          done();
        });
    });

    it('should emit value set with setter', done => {
      state.set('testBehavior', 'new value');

      state.testBehavior$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          done();
        });
    });
  });

  describe('immutability', () => {
    beforeEach(() => {
      StateBehavior([])(state, 'testBehaviorArr');
      StateBehavior({})(state, 'testBehaviorObj');
    });

    it('should set a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.set('testBehaviorArr', setArray);

      expect(state['_testBehaviorArr'].value).not.toBe(setArray);
      expect(state['_testBehaviorArr'].value).toEqual(setArray);

      state.testBehaviorArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });
    });

    it('should get a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.set('testBehaviorArr', setArray);

      expect(state['_testBehaviorArr'].value).not.toBe(setArray);
      expect(state['_testBehaviorArr'].value).toEqual(setArray);

      state.testBehaviorArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });
    });

    it('should set a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testBehaviorObj', setObject);

      expect(state['_testBehaviorObj'].value).not.toBe(setObject);
      expect(state['_testBehaviorObj'].value).toEqual(setObject);

      state.testBehaviorObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });
    });

    it('should get a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testBehaviorObj', setObject);

      expect(state['_testBehaviorObj'].value).not.toBe(setObject);
      expect(state['_testBehaviorObj'].value).toEqual(setObject);

      state.testBehaviorObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });
    });
  });
});
