import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'noosfero-main-block',
})
export class MainBlockUpgradeDirective extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('noosferoMainBlock', elementRef, injector);
    }
}