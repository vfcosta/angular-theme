import {Component, Inject, Input} from 'ng-forward';
import {DesignModeService} from './designMode.service';
import {AuthService, AuthEvents} from '../../login';

@Component({
    selector: 'noosfero-design-toggler',
    templateUrl: 'app/admin/layout-edit/designModeToggler.html'
})
@Inject(DesignModeService, AuthService, '$sce')
export class DesignModeTogglerComponent {

    @Input() iconClass: string = '';
    @Input() knobLabel: string = '';
    @Input() offLabel: string = '';
    @Input() onLabel: string = '';

    private _inDesignMode: boolean = false;

    constructor(private designModeService: DesignModeService, private authService: AuthService, private $sce: ng.ISCEService) {
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.designModeService.destroy();
        });
    }

    get icon(): string {
        if (this.iconClass && this.iconClass.trim().length > 0) {
            return '<i class=\'design-toggle-icon ' + this.iconClass + '\'></i>';
        }
        else {
            return '';
        }
    }

    getKnobLabel(): string {
        return this.$sce.trustAsHtml(this.icon + this.knobLabel);
    }

    get inDesignMode(): boolean {
        return this.designModeService.isInDesignMode();
    };

    set inDesignMode(value: boolean) {
        this.designModeService.setInDesignMode(value);
    };
}
