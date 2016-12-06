import { Input, provide, Component } from 'ng-forward';
import { BootstrapResizableDirective } from "./bootstrap-resizable.directive";
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<div bootstrap-resizable="ctrl.enabled" bootstrap-resizable-columns="ctrl.columns"></div>';

describe("Bootstrap Resizable Directive", () => {

    let element: any = { className: 'other-class col-md-12' };
    element.querySelector = jasmine.createSpy("querySelector");
    let subElement = { style: { height: 0 } };
    (<any>subElement).addEventListener = jasmine.createSpy("addEventListener");
    let elements: any = [element];

    elements.append = jasmine.createSpy("append");
    elements.removeClass = jasmine.createSpy("removeClass");
    elements.addClass = jasmine.createSpy("addClass");
    element.querySelector = jasmine.createSpy("querySelector").and.returnValue(subElement);

    let scope = jasmine.createSpyObj("$scope", ["$watch", "$eval", "$apply"]);
    let style = jasmine.createSpyObj("style", ["getPropertyValue"]);
    let window = jasmine.createSpyObj("$window", ["getComputedStyle"]);
    window.getComputedStyle = jasmine.createSpy("getComputedStyle").and.returnValue(style);

    scope.$watch = (param: string, f: Function) => { f(); };
    scope.$eval = (param: any) => { return param; };

    it("be enabled when bootstrapResizable is true", (done: Function) => {
        let attrs: any = { bootstrapResizable: true, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        expect(directive.isEnabled()).toBeTruthy();
        expect(elements.addClass).toHaveBeenCalledWith('boostrap-resizable');
        expect(elements.removeClass).toHaveBeenCalledWith('boostrap-resizable-disabled');
        done();
    });

    it("be disabled when bootstrapResizable is false", (done: Function) => {
        let attrs: any = { bootstrapResizable: false, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        expect(directive.isEnabled()).toBeFalsy();
        expect(elements.removeClass).toHaveBeenCalledWith('boostrap-resizable');
        expect(elements.addClass).toHaveBeenCalledWith('boostrap-resizable-disabled');
        done();
    });

    it("return current columns based on element class", (done: Function) => {
        let attrs: any = { bootstrapResizable: false, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        expect(directive.getCurrentColumns()).toEqual(12);
        done();
    });

    it("change class when call replace columns", (done: Function) => {
        let attrs: any = { bootstrapResizable: false, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        directive.replaceColumnClass(12, 6);
        expect(elements.addClass).toHaveBeenCalledWith('col-md-6');
        expect(elements.removeClass).toHaveBeenCalledWith('col-md-12');
        done();
    });

    it("do nothing when click and the directive is disabled", (done: Function) => {
        let attrs: any = { bootstrapResizable: false, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        let event: any = { which: 1 };
        directive.mouseDown(event);
        expect(elements.addClass).not.toHaveBeenCalledWith('bootstrap-resizing');
        done();
    });

    it("add class when resizing with mouse click", (done: Function) => {
        let attrs: any = { bootstrapResizable: true, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        let event: any = { which: 1 };
        directive.mouseDown(event);
        expect(elements.addClass).toHaveBeenCalledWith('bootstrap-resizing');
        done();
    });

    it("add class when resizing with touch", (done: Function) => {
        let attrs: any = { bootstrapResizable: true, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        let event: any = { touches: [{ clientX: 1 }] };
        directive.mouseDown(event);
        expect(elements.addClass).toHaveBeenCalledWith('bootstrap-resizing');
        done();
    });

    it("remove class when end resizing", (done: Function) => {
        let attrs: any = { bootstrapResizable: true, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        let event: any = {};
        directive.dragEnd(event);
        expect(elements.removeClass).toHaveBeenCalledWith('bootstrap-resizing');
        done();
    });

    it("change class when dragging", (done: Function) => {
        let attrs: any = { bootstrapResizable: false, bootstrapResizableColumns: 12 };
        let directive = new BootstrapResizableDirective(<any>attrs, scope, <any>elements, window);
        let event: any = {};
        directive.dragging(event);
        expect(elements.addClass).toHaveBeenCalledWith('col-md-6');
        expect(elements.removeClass).toHaveBeenCalledWith('col-md-12');
        done();
    });
});
