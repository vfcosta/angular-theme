import {Component, Inject} from 'ng-forward';
import {DesignModeService} from './designMode.service';
@Component({
    selector: 'noosfero-design-toggler',
    templateUrl: 'app/admin/designModeToggler.html'
})
@Inject(DesignModeService, '$scope')
export class DesignModeTogglerComponent {

    inDesignMode: boolean = false;

    constructor(private designModeService: DesignModeService, private $scope: ng.IScope) {
    }

    ngOnInit() {
        this.designModeService.onToggle.subscribe((editOnOrFalse: boolean) => {
            this.inDesignMode = editOnOrFalse;
            this.$scope.$apply();
        });
    }

    toggleDesignModeOn() {
        if (!this.inDesignMode) {
            this.designModeService.toggle();
        }
    }

    toggleDesignModeOff() {
        if (this.inDesignMode) {
            this.designModeService.toggle();
        }
    }
}