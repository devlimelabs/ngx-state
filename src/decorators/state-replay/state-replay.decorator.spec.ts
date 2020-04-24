import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { TestBed, async } from '@angular/core/testing';

describe('@StateReplay', () => {
  let state: TestState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TestState ]
    });

    state = TestBed.inject(TestState);
  });

  describe('no initial value', () => {

    it('should create the observable property', () => {
      expect(state.testReplay$ instanceof Observable).toBeTruthy();
    });

    it('should emit value set with setter', async(() => {
      state.set('testReplay', 'new value');

      state.testReplay$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          expect(state.testReplay).toEqual('new value');
        });
    }));
  });

  describe('replay length', () => {
    it('should create the observable property', () => {
      expect(state.testReplayLength$ instanceof Observable).toBeTruthy();
    });

    it('should replay length provided to decorator', async(() => {
      const values = [];

      state.set('testReplayLength', 'value 1');
      state.set('testReplayLength', 'value 2');
      state.set('testReplayLength', 'value 3');
      state.set('testReplayLength', 'value 4');

      state.testReplayLength$
        .pipe(
          take(3),
          finalize(() => {
            expect(values).toEqual([
              'value 2',
              'value 3',
              'value 4'
            ]);
          })
        )
        .subscribe(value => values.push(value));
    }));
  });

  describe('immutability', () => {
    it('should set a copy of an array', async(() => {
      const setArray = [1, 2, 3];

      state.set('testReplayArr', setArray);

      state.testReplayArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });
    }));

    it('should get a copy of an array', async(() => {
      const setArray = [1, 2, 3];

      state.set('testReplayArr', setArray);

      state.testReplayArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });
    }));

    it('should set a copy of an object', async(() => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testReplayObj', setObject);

      state.testReplayObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });
    }));

    it('should get a copy of an object', async(() => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.set('testReplayObj', setObject);

      state.testReplayObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });
    }));
  });

  describe('state sync values', () => {
    it('should store values for synchronous get', () => {
      state.set('testReplay', 'synchronously');

      expect(state.get('testReplay')).toEqual('synchronously');
      expect(state.testReplay).toEqual('synchronously');
    });
  });
});
