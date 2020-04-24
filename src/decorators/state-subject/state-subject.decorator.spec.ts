import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { TestBed, async } from '@angular/core/testing';

describe('@StateSubject', () => {
  let state: TestState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestState]
    });

    state = TestBed.inject(TestState);
  });

  describe('no initial value', () => {
    it('should create the public, private, and observable properties', () => {
      expect(state.testSubject$ instanceof Observable).toBeTruthy();
    });

    it('should emit value set with setter', async(() =>  {
      state.testSubject$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
        });

      state.set('testSubject', 'new value');
      expect(state.testSubject).toEqual('new value');
    }));
  });

  describe('immutability', () => {
    it('should set a copy of an array', async(() =>  {
      const setArray = [1, 2, 3];

      state.testSubjectArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });

      state.set('testSubjectArr', setArray);
    }));

    it('should get a copy of an array', async(() =>  {
      const setArray = [1, 2, 3];

      state.testSubjectArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
        });

      state.set('testSubjectArr', setArray);
    }));

    it('should set a copy of an object', async(() =>  {
      const setObject = { one: 1, two: 2, three: 3 };

      state.testSubjectObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });

      state.set('testSubjectObj', setObject);
    }));

    it('should get a copy of an object', async(() =>  {
      const setObject = { one: 1, two: 2, three: 3 };

      state.testSubjectObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
        });

      state.set('testSubjectObj', setObject);
    }));
  });
});
