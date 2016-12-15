import { Directive, Input, Inject } from 'ng-forward';

@Directive({
    selector: '[noosfero-editable]'
})
@Inject('$attrs', '$scope', '$element', "$compile")
export class EditableDirective {

    originalElement: any;

    constructor(private $attrs: ng.IAttributes,
        private $scope: ng.IScope,
        private $element: ng.IAugmentedJQuery,
        private $compile: ng.ICompileService) {
    }

    ngOnInit() {
        this.originalElement = this.$element[0];
        this.$scope.$watch(() => { return this.isEnabled(); }, () => {
            if (this.isEnabled()) {
                this.$element.attr('editable-text', this.$attrs['noosferoEditableText']);
                this.$element.removeAttr('noosfero-editable');
                this.$compile(this.$element)(this.$scope);
            } else {
                this.$element.removeAttr('editable-text');
                this.$element.removeClass('editable editable-click');
                this.$element.replaceWith(this.originalElement);
            }
        });
    }

    isEnabled() {
        return this.$scope.$eval(this.$attrs['noosferoEditable']) === true;
    }
}
