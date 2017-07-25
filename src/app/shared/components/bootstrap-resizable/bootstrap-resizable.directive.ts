import { Directive, Input, Inject, ElementRef, Output, Renderer, EventEmitter, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/**
 * Based on https://github.com/Reklino/angular-resizable
 */
@Directive({
    selector: '[bootstrapResizable]'
})
export class BootstrapResizableDirective implements OnChanges {

    @Input() designMode;
    @Output() bootstrapResizableColumnsChange = new EventEmitter();
    @Input() bootstrapResizableColumns;
    style: CSSStyleDeclaration;
    start: number;
    w: number;
    h: number;
    prefix = "col-md-";

    mouseUpFn = (e: MouseEvent) => this.dragEnd(e);
    mouseMoveFn = (e: MouseEvent) => this.dragging(e);

    constructor(private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        @Inject('Window') private window: Window,
        private renderer: Renderer
    ) {

        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div class="bootstrap-resize-tool"></div>');
        const resizeTool = this.elementRef.nativeElement.querySelector('.bootstrap-resize-tool');
        resizeTool.addEventListener('mousedown', (e: MouseEvent) => this.mouseDown(e), false);
        resizeTool.addEventListener('touchstart', (e: MouseEvent) => this.mouseDown(e), false);

        this.style = window.getComputedStyle(this.elementRef.nativeElement, null);

    }

    ngOnChanges() {
        this.renderer.setElementClass(this.elementRef.nativeElement, 'boostrap-resizable', this.designMode);
        this.renderer.setElementClass(this.elementRef.nativeElement, 'boostrap-resizable-disabled', !this.designMode);
    }

    mouseDown(e: MouseEvent) {
        if (this.designMode && (e.which === 1 || (<any>e).touches)) {
            this.dragStart(e); // left mouse click or touch screen
        }
    }

    dragStart(e: MouseEvent) {
        this.start = this.getClientX(e);
        this.w = parseInt(this.style.getPropertyValue('width'), 10);
        this.h = parseInt(this.style.getPropertyValue('height'), 10);

        document.addEventListener('mouseup', this.mouseUpFn, false);
        document.addEventListener('mousemove', this.mouseMoveFn, false);
        document.addEventListener('touchend', this.mouseUpFn, false);
        document.addEventListener('touchmove', this.mouseMoveFn, false);

        // Disable highlighting while dragging
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        this.renderer.setElementClass(this.elementRef.nativeElement, 'bootstrap-resizing', true);
    }

    getCurrentColumns() {
        const classes = this.elementRef.nativeElement.classList;
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
        this.renderer.setElementClass(this.elementRef.nativeElement, this.prefix + currentColumns, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, this.prefix + newColumns, true);
        this.bootstrapResizableColumnsChange.next(newColumns);
    }

    dragging(e: MouseEvent) {
        const offset = this.start - this.getClientX(e);
        const currentColumns = this.getCurrentColumns();
        let newColumns = Math.round((currentColumns * (this.w - offset)) / this.elementRef.nativeElement.clientWidth);
        newColumns = Math.max(1, Math.min(12, newColumns));
        this.replaceColumnClass(currentColumns, newColumns);
    }

    dragEnd(e: MouseEvent) {
        document.removeEventListener('mouseup', this.mouseUpFn, false);
        document.removeEventListener('mousemove', this.mouseMoveFn, false);
        document.removeEventListener('touchend', this.mouseUpFn, false);
        document.removeEventListener('touchmove', this.mouseMoveFn, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, 'bootstrap-resizing', false);
    }

    private getClientX(e: MouseEvent) {
        return (<any>e).touches ? (<any>e).touches[0].clientX : e.clientX;
    }

}
