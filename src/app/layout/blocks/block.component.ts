import { Input, Inject, Component } from 'ng-forward';

@Component({
    selector: 'noosfero-block',
    template: '<div></div>'
})
@Inject("$element", "$scope", "$injector", "$compile")
export class BlockComponent {

    @Input() block: any;
    @Input() owner: any;

    ngOnInit() {
        let blockName = (this.block && this.block.type) ? this.block.type.replace(/::/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : "default-block";
        this.$element.replaceWith(this.$compile('<noosfero-' + blockName + ' [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-' + blockName + '>')(this.$scope));
    }

    constructor(private $element: any, private $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) {
    }
}
