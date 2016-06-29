import {Component, Inject} from 'ng-forward';
import {DesignModeService} from './designMode.service';
import {AuthService, AuthEvents} from '../../login';

@Component({
    selector: 'noosfero-design-toggler',
    templateUrl: 'app/admin/layout-edit/designModeToggler.html'
})
@Inject(DesignModeService, AuthService)
export class DesignModeTogglerComponent {

    icon: string = "&nbsp;<i class='glyphicon glyphicon-wrench'></i>&nbsp;";

    constructor(private designModeService: DesignModeService, private authService: AuthService) {
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.designModeService.destroy();
        });
    }

    private _inDesignMode: boolean = false;

    get inDesignMode(): boolean {
        return this.designModeService.isInDesignMode();
    };

    set inDesignMode(value: boolean) {
        this.designModeService.setInDesignMode(value);
    };
}
