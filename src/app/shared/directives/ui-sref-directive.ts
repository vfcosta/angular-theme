import { Directive, ElementRef, Input, Inject, Renderer } from '@angular/core';

@Directive({ selector: '[uiSref]' })
export class UiSrefDirective {

    @Input('uiSref') state: string;
    @Input('uiParams') params: string;
    @Input('uiSrefActive') active: string;

    constructor(private el: ElementRef, private renderer: Renderer,
    // @Inject('$state') private $state: ng.ui.IStateService, @Inject('$transitions') private $transitions
    ) { }

    ngOnInit() {
        // this.el.nativeElement.href = this.$state.href(this.state, this.params);
        // this.$transitions.onSuccess({}, (trans) => {
        //     this.toggleActiveClass(trans.$to());
        // });
        // this.toggleActiveClass(this.$state.current);
    }

    toggleActiveClass(toState: any) {
        let addClass = (toState && toState.name === this.state);
        this.renderer.setElementClass(this.el.nativeElement, this.active, addClass);
    }
}