import { Directive, ElementRef, Input, Inject } from '@angular/core';

@Directive({ selector: '[uiSref]' })
export class UiSrefDirective {

    @Input('uiSref') state: string;
    @Input('uiSrefParams') params: string;

    constructor(private el: ElementRef, @Inject('$state') private $state: ng.ui.IStateService) { }

    ngOnInit() {
        console.log(this.state);
        console.log(this.params);
        this.el.nativeElement.href = this.$state.href(this.state, this.params);
    }
}