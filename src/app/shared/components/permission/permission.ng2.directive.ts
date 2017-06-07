import { Directive, ElementRef, Input, Inject, Renderer, OnChanges } from '@angular/core';

@Directive({
    selector: '[permission]'
})
export class PermissionNg2Directive implements OnChanges {

    @Input('permission') permission: string;
    @Input('permissionAction') permissionAction: string;

    constructor(private element: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: any) {
        if (!this.permission || this.permission.indexOf(this.permissionAction) < 0) {
            this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
        } else {
            this.renderer.setElementStyle(this.element.nativeElement, "display", "");
        }
    }
}
