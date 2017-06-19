import { Directive, ElementRef, Input, Inject, Renderer, OnChanges } from '@angular/core';

declare var _: any;

@Directive({
    selector: '[permission]'
})
export class PermissionNg2Directive implements OnChanges {

    @Input('permission') permission: string;
    @Input('permissionAction') permissionAction: string;

    constructor(private element: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: any) {
        let permString = this.permission.toString();
        if (!this.permission || !_.includes(this.permissionAction, permString)) {
            this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
        } else {
            this.renderer.setElementStyle(this.element.nativeElement, "display", "");
        }
    }
}
