/**
 * Directive inspired by Netanel Basel's "DIY Sibscription Handling Directive" Medium article:
 * https://netbasal.com/diy-subscription-handling-directive-in-angular-c8f6e762697f
 */
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { clone } from '../../clone';
import { Observable, Subscription } from 'rxjs';

export class SubscribeContext {
  $implicit: any = null;
  subscribe: any = null;
}

@Directive({
  /* eslint-disable-next-line @angular-eslint/directive-selector */
  selector: '[subscribe]'
})
export class SubscribeDirective implements OnInit, OnDestroy {
  private observable: Observable<any>;
  private context: SubscribeContext = new SubscribeContext();
  private subscription: Subscription;

  @Input()
  set subscribe(inputObs: Observable<any>) {
    if (this.observable !== inputObs) {
      this.observable = inputObs;

      this.unsubscribe();

      this.subscription = this.observable.subscribe((value) => {
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

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    this.subscription && this.subscription.unsubscribe();
  }
}
