import { StateBehavior, StateProp, StateReplay, StateSubject } from '../decorators';
import { State } from '../';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface TestStateProps {
  testBehavior: string;
  testBehaviorArr: any[];
  testBehaviorObj: object;

  testProp: string;
  testPropArr: any[];
  testPropObj: object;

  testReplay: string;
  testReplayLength: string;
  testReplayArr: any[];
  testReplayObj: object;

  testSubject: string;
  testSubjectArr: any[];
  testSubjectObj: object;
}

@Injectable()
export class TestState extends State<TestStateProps> {
  testBehavior$: Observable<string>;
  testBehaviorArr$: Observable<any[]>;
  testBehaviorObj$: Observable<object>;

  testProp: string;
  testPropArr: any[];
  testPropObj: any;

  @StateReplay<TestState, string>()
    readonly testReplay: string;
    readonly testReplay$: Observable<string>;

  @StateReplay<TestState, string>(3)
    readonly testReplayLength: string;
    readonly testReplayLength$: Observable<string>;

  @StateReplay<TestState, any[]>()
    readonly testReplayArr: any[];
    readonly testReplayArr$: Observable<any[]>;

  @StateReplay<TestState, object>()
    readonly testReplayObj: object;
    readonly testReplayObj$: Observable<object>;

  testSubject$: Observable<string>;
  testSubjectArr$: Observable<any[]>;
  testSubjectObj$: Observable<object>;

  constructor() {
    super();
  }
}
