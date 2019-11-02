import { async } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestState } from '../../test/test.state';
import { StateProp } from './state-prop.decorator';

describe('@StateProp', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
  });

  describe('no initial value', () => {
    beforeEach(() => {
      StateProp()(state, 'testProp');
    });

    it('should create the public and private properties', () => {
      expect(state['_testProp']).toEqual(null);
      expect(state.testProp).toEqual(null);
    });

    it('should set value set with setter', () => {
      state.testProp = 'new value';
      expect(state.testProp).toEqual('new value');
    });
  });

  describe('initial value', () => {
    beforeEach(() => {
      StateProp('initial value')(state, 'testProp');
    });

    it('should create the public and private properties', () => {
      expect(state['_testProp']).toEqual('initial value');
      expect(state.testProp).toEqual('initial value');
    });

    it('should set value set with setter', () => {
      state.testProp = 'new value';
      expect(state.testProp).toEqual('new value');
    });
  });

  describe('immutability', () => {
    beforeEach(() => {
      StateProp()(state, 'testPropArr');
      StateProp()(state, 'testPropObj');
    });

    it('should set a copy of an array', () => {
      const setArray = [ 1, 2, 3 ];
      state.testPropArr = setArray;
      expect(state['_testPropArr']).toEqual(setArray);
      expect(state['_testPropArr']).not.toBe(setArray);
    });

    it('should get a copy of an array', () => {
      const setArray = [1, 2, 3];
      state.testPropArr = setArray;
      expect(state['_testPropArr']).toEqual(setArray);
      expect(state['_testPropArr']).not.toBe(setArray);
      expect(state.testPropArr).toEqual(setArray);
      expect(state.testPropArr).not.toBe(setArray)
    });

    it('should set a copy of an object', () => {
      const setObject = { one: 1, two: 2, three: 3 };
      state.testPropObj = setObject;
      expect(state['_testPropObj']).toEqual(setObject);
      expect(state['_testPropObj']).not.toBe(setObject);
    });

    it('should get a copy of an object', () => {
      const setObject = { one: 1, two: 2, three: 3 };
      state.testPropObj = setObject;
      expect(state['_testPropObj']).toEqual(setObject);
      expect(state['_testPropObj']).not.toBe(setObject);
      expect(state.testPropObj).toEqual(setObject);
      expect(state.testPropObj).not.toBe(setObject)
    });
  });
});
