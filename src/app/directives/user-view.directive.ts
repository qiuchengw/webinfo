import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-user-view]'
})
export class UserViewDirective {

  constructor(public viewRef: ViewContainerRef) {
  }
}
