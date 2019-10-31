import { NgModule } from '@angular/core';

import { SubscribeDirective } from './directives/subscribe/subscribe.directive';

@NgModule({
  declarations: [
    SubscribeDirective
  ],
  exports: [
    SubscribeDirective
  ]
})
export class NgxStateModule { }
