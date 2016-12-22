import {Component, Inject, Input} from 'ng-forward';
import {DesignModeService} from './designMode.service';
import {AuthService, AuthEvents} from '../../login';

@Component({
    selector: 'design-toggler',
    templateUrl: 'app/admin/layout-edit/designModeToggler.html'
})
@Inject(DesignModeService, AuthService, '$sce')
export class DesignModeTogglerComponent {

    private _inDesignMode: boolean = false;

    constructor(private designModeService: DesignModeService, private authService: AuthService, private $sce: ng.ISCEService) {
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.designModeService.destroy();
        });
    }

    get inDesignMode(): boolean {
        return this.designModeService.isInDesignMode();
    };

    set inDesignMode(value: boolean) {
        this.designModeService.setInDesignMode(value);
    };

    label() {
        if (this.designModeService.isInDesignMode()) {
            return "Preview Mode"
        } else {
            return "Edit Mode";
        }
    }

    togleDesignMode() {
        var value = this.designModeService.isInDesignMode();
        this.designModeService.setInDesignMode(!value);
    }
}
