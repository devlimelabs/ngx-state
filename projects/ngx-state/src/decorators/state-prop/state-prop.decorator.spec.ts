import { State } from '../../state';
import { StateProp } from './state-prop.decorator';

const initialValue = 'someInitValue';

interface TestStateProps {
  test: string;
}

class TestState1 extends State<TestStateProps> {
  @StateProp<TestState1, string>()
  test: string;

  constructor() {
    super();
  }
}

class TestState extends State<TestStateProps> {
  @StateProp<TestState, string>(initialValue)
  test: string;

  constructor() {
    super();
  }
}

describe('@StateProp', () => {
  let state: TestState;
  let expectedValue: string;

  beforeEach(() => {
    state = new TestState();
  });

  afterEach(() => {
    state = null;
    expectedValue = null;
  });

  it('should create the public property and default to undefined', () => {
    state = new TestState1();
    expect(state.test).toEqual(undefined);
  });

  it('should create the public property with initialValue when provided', () => {
    expect(state.test).toEqual(initialValue);
  });

  it('should set via setter', () => {
    expectedValue = 'set synchronously';

    expect(state.test).toEqual(initialValue);

    state.test = expectedValue;

    expect(state.test).toEqual(expectedValue);
  });

  it('should set from state set method', () => {
    expectedValue = 'a new value';

    state.set('test', expectedValue);

    expect(state.test).toEqual(expectedValue);
  });
});
