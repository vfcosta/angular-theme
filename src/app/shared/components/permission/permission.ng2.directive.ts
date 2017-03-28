import { Directive, ElementRef, Input, Inject, Renderer } from '@angular/core';

@Directive({
    selector: '[permission]'
})
export class PermissionNg2Directive {

    @Input('permission') permission: string;
    @Input('permissionAction') permissionAction: string;

    constructor(@Inject('$scope') $scope: ng.IScope,
        private el: ElementRef, private renderer: Renderer) {

        $scope.$watch(this.permission, () => {
            if (!this.permission || this.permission.indexOf(this.permissionAction) < 0) {
                this.renderer.setElementStyle(this.el.nativeElement, "display", "none");
            } else {
                this.renderer.setElementStyle(this.el.nativeElement, "display", "");
            }
        });
    }
}
