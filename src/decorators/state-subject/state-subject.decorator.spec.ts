import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { StateSubject } from './state-subject.decorator';

describe('@StateSubject', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
  });

  describe('no initial value', () => {
    beforeEach(() => {
      StateSubject()(state, 'testSubject');
    });

    it('should create the public, private, and observable properties', () => {
      expect(state['_testSubject'] instanceof Subject).toBeTruthy();
      expect(state.testSubject$ instanceof Observable).toBeTruthy();
    });

    it('should emit value set with setter', done => {
      state.testSubject$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual('new value');
          done();
        });

      state.set('testSubject', 'new value');
    });
  });

  describe('immutability', () => {
    beforeEach(() => {
      StateSubject()(state, 'testSubjectArr');
      StateSubject()(state, 'testSubjectObj');
    });

    it('should set a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.testSubjectArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });

      state.set('testSubjectArr', setArray);
    });

    it('should get a copy of an array', done => {
      const setArray = [1, 2, 3];

      state.testSubjectArr$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).toEqual(setArray);
          expect(value).not.toBe(setArray);
          done();
        });

      state.set('testSubjectArr', setArray);
    });

    it('should set a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.testSubjectObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });

      state.set('testSubjectObj', setObject);
    });

    it('should get a copy of an object', done => {
      const setObject = { one: 1, two: 2, three: 3 };

      state.testSubjectObj$
        .pipe(take(1))
        .subscribe(value => {
          expect(value).not.toBe(setObject);
          expect(value).toEqual(setObject);
          done();
        });

      state.set('testSubjectObj', setObject);
    });
  });
});
