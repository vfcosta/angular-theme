import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector : '[href]'
})
export class EmptyLinkDirective {

    @Input() href;

    @HostListener('document:click', ['$event'])
    preventDefault(event) {
        if (this.href.length === 0 || this.href === "#") event.preventDefault();
    }
}
