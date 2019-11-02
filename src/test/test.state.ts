import { StateBehavior, StateProp, StateReplay, StateSubject } from '../decorators';
import { State } from '../';
import { Observable } from 'rxjs';

export interface TestStateProps {
  testBehavior: string;
  testBehaviorArr: any[];
  testBehaviorObj: object;

  testProp: string;
  testPropArr: any[];
  testPropObj: object;

  testReplay: string;
  testReplayArr: any[];
  testReplayObj: object;

  testSubject: string;
  testSubjectArr: any[];
  testSubjectObj: object;
}

export class TestState extends State<TestStateProps> {
  testBehavior$: Observable<string>;
  testBehaviorArr$: Observable<any[]>;
  testBehaviorObj$: Observable<object>;

  testProp: string;
  testPropArr: any[];
  testPropObj: any;

  testReplay$: Observable<string>;
  testReplayArr$: Observable<any[]>;
  testReplayObj$: Observable<object>;

  testSubject$: Observable<string>;
  testSubjectArr$: Observable<any[]>;
  testSubjectObj$: Observable<object>;

  constructor() {
    super();
  }
}
