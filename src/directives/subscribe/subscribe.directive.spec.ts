import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { StateReplay } from '../../decorators/state-replay/state-replay.decorator';
import { State } from '../../state';
import { SubscribeDirective } from './subscribe.directive';

const initialValues = {
  testString: 'default string',
  testNum: 1,
  testObj: { thing: 'value', athing: 'some other value', bthing: 3 },
  testArr: [1, 2, 'three']
};

export interface TestStateProps {
  testString: string;
  testNum: number;
  testObj: object;
  testArr: any[];
}

export class TestState extends State<TestStateProps> {
  @StateReplay<TestState, string>()
    private testString: string;
    readonly testString$: Observable<string>;

  @StateReplay<TestState, number>()
    private testNum: number;
    readonly testNum$: Observable<number>;

  @StateReplay<TestState, object>()
    private testObj: object;
    readonly testObj$: Observable<object>;

  @StateReplay<TestState, []>()
    private testArr: any[];
    readonly testArr$: Observable<any[]>;

  constructor() {
    super();
  }
}

@Component({
  template: `
    <div id="testString" *subscribe="state.testString$ as testString">{{ testString }}</div>
    <div id="testNum" *subscribe="state.testNum$ as testNum">{{ testNum }}</div>
    <div id="testObj" *subscribe="state.testObj$ as testObj">{{ testObj | json }}</div>
    <div id="testArr" *subscribe="state.testArr$ as testArr">{{ testArr }}</div>
  `
})
class TestStateComponent {
  constructor(public state: TestState) {}
}

describe('SubscribeDirective', () => {
  let component: TestStateComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<any>;
  let state: TestState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SubscribeDirective, TestStateComponent],
      providers: [TestState]
    }).compileComponents();

    state = TestBed.get(TestState);
    state.set('testArr', initialValues.testArr);
    state.set('testNum', initialValues.testNum);
    state.set('testObj', initialValues.testObj);
    state.set('testString', initialValues.testString);

    fixture = TestBed.createComponent(TestStateComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe('string value', () => {
    let stringEl: HTMLElement;

    beforeEach(() => {
      stringEl = debugEl.query(By.css('#testString')).nativeElement;
    });

    afterEach(() => {
      stringEl = null;
    });

    it('should display the default value', () => {
      expect(stringEl.textContent).toEqual(initialValues.testString);
    });

    it('should update the value when state changes', () => {
      const expectedValue = 'a new string value';
      expect(stringEl.textContent).toEqual(initialValues.testString);
      state.set('testString', expectedValue);
      fixture.detectChanges();
      expect(stringEl.textContent).toEqual(expectedValue);
    });
  });

  describe('number value', () => {
    let numberEl: HTMLElement;

    beforeEach(() => {
      numberEl = debugEl.query(By.css('#testNum')).nativeElement;
    });

    afterEach(() => {
      numberEl = null;
    });

    it('should display the default value', () => {
      expect(numberEl.textContent).toEqual(initialValues.testNum.toString());
    });

    it('should update the value when state changes', () => {
      const expectedValue = 100;
      expect(numberEl.textContent).toEqual(initialValues.testNum.toString());
      state.set('testNum', expectedValue);
      fixture.detectChanges();
      expect(numberEl.textContent).toEqual(expectedValue.toString());
    });
  });

  describe('object value', () => {
    let objectEl: HTMLElement;

    beforeEach(() => {
      objectEl = debugEl.query(By.css('#testObj')).nativeElement;
    });

    afterEach(() => {
      objectEl = null;
    });

    it('should display the default value', () => {
      expect(objectEl.textContent).toEqual(JSON.stringify(initialValues.testObj, null, 2));
    });

    it('should update the value when state changes', () => {
      const expectedValue = { key: 'new stuff', anything: 123 };
      expect(objectEl.textContent).toEqual(JSON.stringify(initialValues.testObj, null, 2));
      state.set('testObj', expectedValue);
      fixture.detectChanges();
      expect(objectEl.textContent).toEqual(JSON.stringify(expectedValue, null, 2));
    });
  });

  describe('array value', () => {
    let arrayEl: HTMLElement;

    beforeEach(() => {
      arrayEl = debugEl.query(By.css('#testArr')).nativeElement;
    });

    afterEach(() => {
      arrayEl = null;
    });

    it('should display the default value', () => {
      expect(arrayEl.textContent).toEqual(initialValues.testArr.toString());
    });

    it('should update the value when state changes', () => {
      const expectedValue = ['hey', 'you', 'there', 456];
      expect(arrayEl.textContent).toEqual(initialValues.testArr.toString());
      state.set('testArr', expectedValue);
      fixture.detectChanges();
      expect(arrayEl.textContent).toEqual(expectedValue.toString());
    });
  });
});
