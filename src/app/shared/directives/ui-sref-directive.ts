import { Directive, ElementRef, Input, Inject } from '@angular/core';

@Directive({ selector: '[uiSref]' })
export class UiSrefDirective {

    @Input('uiSref') state: string;
    @Input('uiParams') params: string;

    constructor(private el: ElementRef, @Inject('$state') private $state: ng.ui.IStateService) { }

    ngOnInit() {
        this.el.nativeElement.href = this.$state.href(this.state, this.params);
    }
}