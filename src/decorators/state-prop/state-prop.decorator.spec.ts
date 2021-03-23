import { TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { StateProp } from './state-prop.decorator';

describe('@StateProp', () => {
  let state: TestState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestState],
    });

    state = TestBed.inject(TestState);
  });

  describe('no initial value', () => {

    it('should create the public and private properties', () => {
      expect(state.testProp).toEqual(undefined);
    });

    it('should set value set with setter', () => {
      state.testProp = 'new value';
      expect(state.testProp).toEqual('new value');
    });
  });

  describe('initial value', () => {
    it('should create the public and private properties', () => {
      expect(state.testPropDefault).toEqual('default');
      expect(state.get('testPropDefault')).toEqual('default');
    });

    it('should set value set with setter', () => {
      state.testPropDefault = 'new value';
      expect(state.testPropDefault).toEqual('new value');
      expect(state.get('testPropDefault')).toEqual('new value');
    });
  });

  describe('immutability', () => {

    it('should set a copy of an array', () => {
      const setArray = [ 1, 2, 3 ];
      state.testPropArr = setArray;
      expect(state.testPropArr).toEqual(setArray);
      expect(state.testPropArr).not.toBe(setArray);
    });

    it('should get a copy of an array', () => {
      const setArray = [1, 2, 3];
      state.testPropArr = setArray;
      expect(state.testPropArr).toEqual(setArray);
      expect(state.testPropArr).not.toBe(setArray);
      expect(state.testPropArr).toEqual(setArray);
      expect(state.testPropArr).not.toBe(setArray);
    });

    it('should set a copy of an object', () => {
      const setObject = { one: 1, two: 2, three: 3 };
      state.testPropObj = setObject;
      expect(state.testPropObj).toEqual(setObject);
      expect(state.testPropObj).not.toBe(setObject);
    });

    it('should get a copy of an object', () => {
      const setObject = { one: 1, two: 2, three: 3 };
      state.testPropObj = setObject;
      expect(state.testPropObj).toEqual(setObject);
      expect(state.testPropObj).not.toBe(setObject);
      expect(state.testPropObj).toEqual(setObject);
      expect(state.testPropObj).not.toBe(setObject);
    });
  });
});
