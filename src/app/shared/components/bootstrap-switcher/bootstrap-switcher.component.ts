import {Component, Input, Output, EventEmitter} from 'ng-forward';


export interface BootstrapSwitcherItem {
    value: any;
    label: string;
}
@Component({
    selector: 'noosfero-bootstrap-switcher',
    template: `
        <span class="switcher-label" ng-bind="ctrl.label | translate"></span>
        <div class="btn-group switcher">
            <button ng-repeat="option in ctrl.options track by $index"
                   (click)="ctrl.switcherClick(option)"
                   ng-class="ctrl.getCssClassForItem(option)"
                   class="btn btn-xs" ng-bind="option.label | translate">
             </button>
        </div>
    `,
    inputs: ['activeClass', 'defaultClass', 'label', 'options', 'defaultOption'],
    outputs: ['onSwitch']
})
export class BootstrapSwitcherComponent {
    @Input() activeClass: string = 'active btn-danger';
    @Input() defaultClass: string = 'btn-default';
    @Input() label: string;
    @Input() options: BootstrapSwitcherItem[];
    @Input() defaultOption: BootstrapSwitcherItem;
    @Output() onSwitch: EventEmitter<BootstrapSwitcherItem> = new EventEmitter<BootstrapSwitcherItem>();

    selectedOption: BootstrapSwitcherItem = null;

    constructor() { }

    ngOnInit() {
        this.selectedOption = this.defaultOption;
    }

    isSelectedOption(value: BootstrapSwitcherItem): boolean {
        return this.selectedOption === value;
    }

    getCssClassForItem(value: BootstrapSwitcherItem): string {
        return this.isSelectedOption(value) ? this.activeClass : this.defaultClass;
    }

    switcherClick(value: BootstrapSwitcherItem) {
        this.selectedOption = value;
        this.onSwitch.next(value);
    }
}