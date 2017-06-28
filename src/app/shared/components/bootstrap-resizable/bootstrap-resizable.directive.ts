import { Directive, Input, Inject, ElementRef, Output } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/**
 * Based on https://github.com/Reklino/angular-resizable
 */
@Directive({
    selector: '[bootstrap-resizable]'
})
export class BootstrapResizableDirective {

    @Input() bootstrapResizable;
    @Output() bootstrapResizableColumns;
    style: CSSStyleDeclaration;
    start: number;
    w: number;
    h: number;
    prefix = "col-md-";

    mouseUpFn = (e: MouseEvent) => this.dragEnd(e);
    mouseMoveFn = (e: MouseEvent) => this.dragging(e);

    constructor(private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        @Inject('Window') private window: Window) {

        console.log('##### bootstrapResizableColumns');
        
        this.elementRef.nativeElement.append('<div class="bootstrap-resize-tool"></div>');
        let resizeTool = this.elementRef.nativeElement[0].querySelector('.bootstrap-resize-tool');
        resizeTool.addEventListener('mousedown', (e: MouseEvent) => this.mouseDown(e), false);
        resizeTool.addEventListener('touchstart', (e: MouseEvent) => this.mouseDown(e), false);

        this.style = window.getComputedStyle(this.elementRef.nativeElement[0], null);

    }

    ngOnChanges() {
        if (this.bootstrapResizable) {
            this.elementRef.nativeElement.addClass('boostrap-resizable');
            this.elementRef.nativeElement.removeClass('boostrap-resizable-disabled');
        } else {
            this.elementRef.nativeElement.removeClass('boostrap-resizable');
            this.elementRef.nativeElement.addClass('boostrap-resizable-disabled');
        }
    }

    mouseDown(e: MouseEvent) {
        if (this.bootstrapResizable && (e.which === 1 || (<any>e).touches)) {
            this.dragStart(e); // left mouse click or touch screen
        }
    }

    dragStart(e: MouseEvent) {
        this.start = this.getClientX(e);
        this.w = parseInt(this.style.getPropertyValue('width'));
        this.h = parseInt(this.style.getPropertyValue('height'));

        document.addEventListener('mouseup', this.mouseUpFn, false);
        document.addEventListener('mousemove', this.mouseMoveFn, false);
        document.addEventListener('touchend', this.mouseUpFn, false);
        document.addEventListener('touchmove', this.mouseMoveFn, false);

        // Disable highlighting while dragging
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        this.elementRef.nativeElement.addClass('bootstrap-resizing');
    }

    getCurrentColumns() {
        let classes = this.elementRef.nativeElement[0].className.split(' ');
        let columns = 12;
        classes.forEach((cl: string) => {
            if (cl.startsWith(this.prefix)) {
                columns = Number(cl.replace(this.prefix, ''));
                return;
            }
        });
        return columns;
    }

    replaceColumnClass(currentColumns: number, newColumns: number) {
        this.elementRef.nativeElement.removeClass(this.prefix + currentColumns);
        this.elementRef.nativeElement.addClass(this.prefix + newColumns);
        this.bootstrapResizableColumns = newColumns;
    }

    dragging(e: MouseEvent) {
        let offset = this.start - this.getClientX(e);
        let currentColumns = this.getCurrentColumns();
        let newColumns = Math.round((currentColumns * (this.w - offset)) / this.elementRef.nativeElement[0].clientWidth);
        newColumns = Math.max(1, Math.min(12, newColumns));
        this.replaceColumnClass(currentColumns, newColumns);
    }

    dragEnd(e: MouseEvent) {
        document.removeEventListener('mouseup', this.mouseUpFn, false);
        document.removeEventListener('mousemove', this.mouseMoveFn, false);
        document.removeEventListener('touchend', this.mouseUpFn, false);
        document.removeEventListener('touchmove', this.mouseMoveFn, false);
        this.elementRef.nativeElement.removeClass('bootstrap-resizing');
    }

    private getClientX(e: MouseEvent) {
        return (<any>e).touches ? (<any>e).touches[0].clientX : e.clientX;
    }

}
