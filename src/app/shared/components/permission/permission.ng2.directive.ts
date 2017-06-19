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
        let render = false;
        if (this.permissionAction) {
            let perms = this.permissionAction.split(",");
            _.forEach(perms, permAction => {
                _.forEach(this.permission, perm => {
                    if (perm === permAction) {
                        render = true;
                        return false;
                    }
                });
                if (render)
                    return false;
            });
            if (!render) {
                this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
            } else {
                this.renderer.setElementStyle(this.element.nativeElement, "display", "");
            }
        } else {
            this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
        }
    }
}
