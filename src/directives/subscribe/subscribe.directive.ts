import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { clone } from 'lodash';
import { Observable } from 'rxjs';

export class SubscribeContext {
  $implicit: any = null;
  subscribe: any = null;
}

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: '[subscribe]'
})
export class SubscribeDirective implements OnInit, OnDestroy {
  private observable: Observable<any>;
  private context: SubscribeContext = new SubscribeContext();
  private scvngr = new Scavenger(this);

  @Input()
  set subscribe(inputObs: Observable<any>) {
    if (this.observable !== inputObs) {
      this.observable = inputObs;

      this.observable
        .pipe(
          this.scvngr.collectByKey('subscribe')
        ).subscribe((value) => {
          this.context.subscribe = clone(value);
          this.cdr.markForCheck();
        });
    }
  }

  constructor(
    private container: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.container.createEmbeddedView(this.template, this.context);
  }

  ngOnDestroy() {}
}
