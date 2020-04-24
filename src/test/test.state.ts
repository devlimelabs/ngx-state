import { StateBehavior, StateProp, StateReplay, StateSubject } from '../decorators';
import { State } from '../';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface TestStateProps {
  testBehavior: string;
  testBehaviorDefault: string;
  testBehaviorArr: any[];
  testBehaviorObj: object;

  testProp: string;
  testPropDefault: string;
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

@Injectable({
  providedIn: 'root'
})
export class TestState extends State<TestStateProps> {

  @StateBehavior<TestState, string>('')
    readonly testBehavior: string;
    testBehavior$: Observable<string>;

  @StateBehavior<TestState, string>('default')
    testBehaviorDefault: string;
    testBehaviorDefault$: Observable<string>;

  @StateBehavior<TestState, any[]>([])
    testBehaviorArr: any[];
    testBehaviorArr$: Observable<any[]>;

  @StateBehavior<TestState, object>({})
    testBehaviorObj: object;
    testBehaviorObj$: Observable<object>;


  @StateProp<TestState, string>()
    testProp: string;

  @StateProp<TestState, string>('default')
    testPropDefault: string;

  @StateProp<TestState, any[]>()
    testPropArr: any[];

  @StateProp<TestState, any>()
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


  @StateSubject<TestState, string>()
    readonly testSubject: string;
    readonly testSubject$: Observable<string>;

  @StateSubject<TestState, any[]>()
    readonly testSubjectArr: any[];
    readonly testSubjectArr$: Observable<any[]>;

  @StateSubject<TestState, object>()
    readonly testSubjectObj: object;
    readonly testSubjectObj$: Observable<object>;


  constructor() {
    super();
  }
}
