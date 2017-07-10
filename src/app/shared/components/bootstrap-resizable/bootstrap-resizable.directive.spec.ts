import { Input, Component } from '@angular/core';
import { BootstrapResizableDirective } from './bootstrap-resizable.directive';
import * as helpers from '../../../../spec/helpers';
import { async } from '@angular/core/testing';

const htmlTemplate: string = '<div bootstrap-resizable="ctrl.enabled" bootstrap-resizable-columns="ctrl.columns"></div>';

describe("Bootstrap Resizable Directive", () => {

    let elementRef: any = { nativeElement: { className: 'other-class col-md-12' } };

    let subElement = { style: { height: 0 } };
    (<any>subElement).addEventListener = jasmine.createSpy("addEventListener");

    elementRef.nativeElement.querySelector = jasmine.createSpy("querySelector").and.returnValue(subElement);
    elementRef.nativeElement.insertAdjacentHTML = jasmine.createSpy("insertAdjacentHTML");

    let style = jasmine.createSpyObj("style", ["getPropertyValue"]);
    let window = jasmine.createSpyObj("window", ["getComputedStyle"]);
    window.getComputedStyle = jasmine.createSpy("getComputedStyle").and.returnValue(style);
    let renderer = jasmine.createSpyObj("renderer", ["setElementClass"]);
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
        let event: any = { which: 1 };
        directive.mouseDown(event);
        expect(renderer.setElementClass).not.toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);
    });

    it("add class when resizing with mouse click", () => {
        let event: any = { which: 1 };
        directive.mouseDown(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);

    });

    it("add class when resizing with touch", () => {
        let event: any = { touches: [{ clientX: 1 }] };
        directive.mouseDown(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', true);
    });

    it("remove class when end resizing", () => {
        let event: any = {};
        directive.dragEnd(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bootstrap-resizing', false);
    });

    it("change class when dragging", () => {
        let event: any = {};
        directive.dragging(event);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-6', true);
        expect(renderer.setElementClass).toHaveBeenCalledWith(elementRef.nativeElement, 'col-md-12', false);
    });
});
