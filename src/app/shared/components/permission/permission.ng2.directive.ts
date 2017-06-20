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
        if(_.isEmpty(_.intersectionBy(this.permission, this.permissionAction.split(',')))){
            this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
        } else{
            this.renderer.setElementStyle(this.element.nativeElement, "display", "");
        }
    }
}
