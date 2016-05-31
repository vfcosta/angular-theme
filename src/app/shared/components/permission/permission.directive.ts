import {Directive, Inject, Input} from "ng-forward";

@Directive({
    selector: '[permission]'
})
@Inject('$attrs', '$scope', '$element')
export class PermissionDirective {

    constructor($attrs: ng.IAttributes, $scope: ng.IScope, $element: any) {
        $scope.$watch($attrs['permission'], () => {
            let permissions = $scope.$eval($attrs['permission']);
            let permissionAction = $attrs['permissionAction'];
            if (!permissions || permissions.indexOf(permissionAction) < 0) {
                $element.css("display", "none");
            } else {
                $element.css("display", "");
            }
        });
    }
}
