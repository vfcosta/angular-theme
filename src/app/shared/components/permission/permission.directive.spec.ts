import {Input, provide, Component} from 'ng-forward';
import {PermissionDirective} from "./permission.directive";
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<div permission="ctrl.permissions" permission-action="action"></div>';

describe("Permission directive", () => {

    let element = jasmine.createSpyObj("$element", ["css"]);
    let scope = jasmine.createSpyObj("$scope", ["$watch", "$eval"]);
    scope.$watch = (param: string, f: Function) => { f(); };
    scope.$eval = (param: any) => { return param; };

    it("hide element when there is no permission action in the permissions array", (done: Function) => {
        let attrs: any = { permission: [], permissionAction: 'action' };
        let directive = new PermissionDirective(<any>attrs, scope, element);
        expect(element.css).toHaveBeenCalledWith('display', 'none');
        done();
    });

    it("show element when the permission action exists in the permissions array", (done: Function) => {
        let attrs = { permission: ['action'], permissionAction: 'action' };
        let directive = new PermissionDirective(<any>attrs, scope, element);
        expect(element.css).toHaveBeenCalledWith('display', '');
        done();
    });
});
