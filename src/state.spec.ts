import { State } from './state';

interface StateProps {
  bool: boolean;
  num: number;
  obj: object;
  str: string;
}

class TestState extends State<StateProps> {
  bool: boolean;
  num: number;
  obj: object;
  str: string;
}

describe('State', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState();
  });

  it('should create an instance', () => {
    expect(state).toBeTruthy();
  });

  it('should set properties', () => {
    const expectedBool = false;
    const expectedNum = 8;
    const expectedObj = { key: 'value', otherNum: 5 };
    const expectedStr = 'a string in state';

    expect(state.bool).toBeUndefined();
    expect(state.num).toBeUndefined();
    expect(state.obj).toBeUndefined();
    expect(state.str).toBeUndefined();

    state.set('bool', expectedBool);
    state.set('num', expectedNum);
    state.set('obj', expectedObj);
    state.set('str', expectedStr);

    expect(state.bool).toEqual(expectedBool);
    expect(state.num).toEqual(expectedNum);
    expect(state.obj).toEqual(expectedObj);
    expect(state.str).toEqual(expectedStr);
  });
});
