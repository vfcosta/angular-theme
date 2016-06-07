import {Component, Inject} from 'ng-forward';
import {DesignModeService} from './designMode.service';
@Component({
    selector: 'noosfero-design-toggler',
    templateUrl: 'app/admin/designModeToggler.html'
})
@Inject(DesignModeService)
export class DesignModeTogglerComponent {

    icon: string = "&nbsp;<i class='glyphicon glyphicon-wrench'></i>&nbsp;";

    constructor(private designModeService: DesignModeService) {
    }

    private _inDesignMode: boolean = false;

    get inDesignMode(): boolean {
        return this.designModeService.isInDesignMode();
    };

    set inDesignMode(value: boolean) {
        this.designModeService.setInDesignMode(value);
    };
}