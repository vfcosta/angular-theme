import {Component, Inject} from 'ng-forward';
import {DesignModeService} from './designMode.service';
@Component({
    selector: 'noosfero-design-toggler',
    templateUrl: 'app/admin/designModeToggler.html'
})
@Inject(DesignModeService, '$scope')
export class DesignModeTogglerComponent {


    constructor(private designModeService: DesignModeService, private $scope: ng.IScope) {
    }

    private _inDesignMode: boolean = false;

    get inDesignMode(): boolean {
        return this.designModeService.isInDesignMode();
    };

    set inDesignMode(value: boolean) {
        this.designModeService.setInDesignMode(value);
    };

}