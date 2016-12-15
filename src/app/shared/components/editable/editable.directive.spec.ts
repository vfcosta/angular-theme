import { Input, provide, Component } from 'ng-forward';
import { EditableDirective } from "./editable.directive";
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<div noosfero-editable="ctrl.enabled" noosfero-editable-text="ctrl.text"></div>';

describe("Editable Directive", () => {

    let element = jasmine.createSpyObj("$element", ["attr", "removeAttr", "removeClass", "replaceWith"]);
    let scope = jasmine.createSpyObj("$scope", ["$watch", "$eval"]);
    let compile = jasmine.createSpy("compile").and.returnValue(() => { });

    scope.$watch = (param: Function, f: Function) => { f(); };
    scope.$eval = (param: any) => { return param; };

    it("be enabled when noosferoEditable is true", (done: Function) => {
        let attrs = { noosferoEditable: true };
        let directive = new EditableDirective(<any>attrs, scope, element, compile);
        expect(directive.isEnabled()).toBeTruthy();
        done();
    });

    it("add attribute editable-text when enabled", (done: Function) => {
        let attrs = { noosferoEditable: true, noosferoEditableText: "ctrl.text" };
        let directive = new EditableDirective(<any>attrs, scope, element, compile);
        directive.ngOnInit();
        expect(element.attr).toHaveBeenCalledWith('editable-text', 'ctrl.text');
        done();
    });

    it("remove attribute editable-text when not enabled", (done: Function) => {
        let attrs = { noosferoEditable: false, noosferoEditableText: "ctrl.text" };
        let directive = new EditableDirective(<any>attrs, scope, element, compile);
        directive.ngOnInit();
        expect(element.removeAttr).toHaveBeenCalledWith('editable-text');
        done();
    });

    it("watch to call isEnabled", (done: Function) => {
        scope.$watch = (param: Function, f: Function) => { param(); };
        let attrs = { noosferoEditable: true };
        let directive = new EditableDirective(<any>attrs, scope, element, compile);
        directive.isEnabled = jasmine.createSpy("isEnabled");
        directive.ngOnInit();
        expect(directive.isEnabled).toHaveBeenCalled();
        done();
    });
});
