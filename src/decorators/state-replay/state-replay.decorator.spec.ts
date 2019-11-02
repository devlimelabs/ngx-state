import { Observable, ReplaySubject } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { StateReplay } from './state-replay.decorator';

describe('@StateReplay', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
  });

  describe('no initial value', () => {
    beforeEach(() => {
      StateReplay()(state, 'testReplay');
    });

    it('should create the public, private, and observable properties', () => {
      expect(state['_testReplay'] instanceof ReplaySubject).toBeTruthy();
      expect(state.testReplay$ instanceof Observable).toBeTruthy();
    });

    it('should emit value set with setter', done => {
      state.set('testReplay', 'new value');

      state.testReplay$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          done();
        });
    });
  });

  describe('replay length', () => {
    beforeEach(() => {
      StateReplay(3)(state, 'testReplay');
    });

    it('should create the public, private, and observable properties', () => {
      expect(state['_testReplay'] instanceof ReplaySubject).toBeTruthy();
      expect(state['_testReplay']['_bufferSize']).toEqual(3);
      expect(state.testReplay$ instanceof Observable).toBeTruthy();
    });

    it('should replay length provided to decorator', done => {
      const checkValueSpy = jasmine.createSpy('checkValue', value => {});

      state.set('testReplay', 'value 1');
      state.set('testReplay', 'value 2');
      state.set('testReplay', 'value 3');
      state.set('testReplay', 'value 4');

      state.testReplay$
        .pipe(
          take(3),
          finalize(() => {
            expect(checkValueSpy).toHaveBeenCalledWith('value 2');
            expect(checkValueSpy).toHaveBeenCalledWith('value 3');
            expect(checkValueSpy).toHaveBeenCalledWith('value 4');
            expect(checkValueSpy).toHaveBeenCalledTimes(3);

            done();
          })
        )
        .subscribe(checkValueSpy);
    });

    it('should emit value set with setter', done => {
      state.set('testReplay', 'new value');

      state.testReplay$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          done();
        });
    });
  });

  describe('immutability', () => {
    beforeEach(() => {
      StateReplay()(state, 'testReplayArr');
      StateReplay()(state, 'testReplayObj');
    });

    it('should set a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.set('testReplayArr', setArray);

      state.testReplayArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });
    });

    it('should get a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.set('testReplayArr', setArray);

      state.testReplayArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });
    });

    it('should set a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testReplayObj', setObject);

      state.testReplayObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });
    });

    it('should get a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testReplayObj', setObject);

      state.testReplayObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });
    });
  });
});
