import { Directive, Input, Inject } from 'ng-forward';

/**
 * Based on https://github.com/Reklino/angular-resizable
 */
@Directive({
    selector: '[bootstrap-resizable]'
})
@Inject('$attrs', '$scope', '$element', "$window")
export class BootstrapResizableDirective {

    style: CSSStyleDeclaration;
    start: number;
    w: number;
    h: number;
    prefix = "col-md-";

    mouseUpFn = (e: MouseEvent) => this.dragEnd(e);
    mouseMoveFn = (e: MouseEvent) => this.dragging(e);

    constructor(private $attrs: ng.IAttributes,
        private $scope: ng.IScope,
        private $element: ng.IAugmentedJQuery,
        private $window: ng.IWindowService) {

        this.$element.append('<div class="bootstrap-resize-tool"></div>');
        $element[0].querySelector('.bootstrap-resize-tool').addEventListener('mousedown', (e: MouseEvent) => this.down(e), false);
        $element[0].querySelector('.bootstrap-resize-tool').addEventListener('touchstart', (e: MouseEvent) => this.down(e), false);

        this.style = $window.getComputedStyle($element[0], null);

        $scope.$watch(() => { return this.isEnabled(); }, () => {
            let resizeTool = this.$element[0].querySelector('.bootstrap-resize-tool');
            resizeTool.style['height'] = this.$element[0].clientHeight - 32 + "px";
            if (this.isEnabled()) {
                this.$element.addClass('boostrap-resizable');
                this.$element.removeClass('boostrap-resizable-disabled');
            } else {
                this.$element.removeClass('boostrap-resizable');
                this.$element.addClass('boostrap-resizable-disabled');
            }
        });
    }

    isEnabled() {
        return this.$scope.$eval(this.$attrs['bootstrapResizable']);
    }

    down(e: MouseEvent) {
        if (this.isEnabled() && (e.which === 1 || (<any>e).touches)) {
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
        this.$element.addClass('boostrap-resizing');
    }

    getCurrentColumns() {
        let classes = this.$element[0].className.split(' ');
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
        this.$element.removeClass(this.prefix + currentColumns);
        this.$element.addClass(this.prefix + newColumns);
        this.$scope.$eval(`${this.$attrs['bootstrapResizableColumns']} = ${newColumns}`);
        this.$scope.$apply();
    }

    dragging(e: MouseEvent) {
        let offset = this.start - this.getClientX(e);
        let currentColumns = this.getCurrentColumns();
        let newColumns = Math.round((currentColumns * (this.w - offset)) / this.$element[0].clientWidth);
        newColumns = Math.max(1, Math.min(12, newColumns));
        this.replaceColumnClass(currentColumns, newColumns);
    }

    dragEnd(e: MouseEvent) {
        document.removeEventListener('mouseup', this.mouseUpFn, false);
        document.removeEventListener('mousemove', this.mouseMoveFn, false);
        document.removeEventListener('touchend', this.mouseUpFn, false);
        document.removeEventListener('touchmove', this.mouseMoveFn, false);
        this.$element.removeClass('boostrap-resizing');
    }

    getClientX(e: MouseEvent) {
        return (<any>e).touches ? (<any>e).touches[0].clientX : e.clientX;
    }

}
