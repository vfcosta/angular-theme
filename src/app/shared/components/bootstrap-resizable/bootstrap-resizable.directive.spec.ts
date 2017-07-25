import { Input, Component } from '@angular/core';
import { BootstrapResizableDirective } from './bootstrap-resizable.directive';
import * as helpers from '../../../../spec/helpers';
import { async } from '@angular/core/testing';

describe("Bootstrap Resizable Directive", () => {

    const elementRef: any = { nativeElement: { className: 'other-class col-md-12' } };

    const subElement = { style: { height: 0 } };
    (<any>subElement).addEventListener = jasmine.createSpy("addEventListener");

    elementRef.nativeElement.querySelector = jasmine.createSpy("querySelector").and.returnValue(subElement);
    elementRef.nativeElement.insertAdjacentHTML = jasmine.createSpy("insertAdjacentHTML");

    const style = jasmine.createSpyObj("style", ["getPropertyValue"]);
    const window = jasmine.createSpyObj("window", ["getComputedStyle"]);
    window.getComputedStyle = jasmine.createSpy("getComputedStyle").and.returnValue(style);
    const renderer = jasmine.createSpyObj("renderer", ["setElementClass"]);
    renderer.setElementClass = jasmine.createSpy("setElementClass");
    let directive: any;

    beforeEach(async(() => {
        elementRef.nativeElement.classList = ['col-md-12'];
        directive = new BootstrapResizableDirective(elementRef, document, window, renderer);
        directive.designMode = true;
    }));


    it("be enabled when designMode is true", () => {
        directive.designMode = true;
        directive.ngOnChanges();
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'boostrap-resizable', true);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'boostrap-resizable-disabled', false);
    });

    it("be disabled when designMode is false", () => {
        directive.designMode = false;
        directive.ngOnChanges();
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'boostrap-resizable', false);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'boostrap-resizable-disabled', true);
    });

    it("return current columns based on element class", () => {
        expect(directive.getCurrentColumns()).toEqual(12);

    });

    it("change class when call replace columns", () => {
        directive.replaceColumnClass(12, 6);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-6', true);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-12', false);
    });

    it("do nothing when click and the directive is disabled", () => {
        directive.designMode = false;
        const event: any = { which: 1 };
        directive.mouseDown(event);
        expect(renderer.setElementClass).not.toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);
    });

    it("add class when resizing with mouse click", () => {
        const event: any = { which: 1 };
        directive.mouseDown(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);

    });

    it("add class when resizing with touch", () => {
        const event: any = { touches: [{ clientX: 1 }] };
        directive.mouseDown(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);
    });

    it("remove class when end resizing", () => {
        const event: any = {};
        directive.dragEnd(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', false);
    });

    it("change class when dragging", () => {
        const event: any = {};
        directive.dragging(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-6', true);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-12', false);
    });
});
