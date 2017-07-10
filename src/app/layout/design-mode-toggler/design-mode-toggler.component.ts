import {Component, Inject, Input} from '@angular/core';
import {DesignModeService} from '../../shared/services/design-mode.service';
import {AuthService, AuthEvents} from '../../login';

@Component({
    selector: 'design-toggler',
    templateUrl: './design-mode-toggler.html',
    styleUrls: ['./design-mode-toggler.scss']
})
export class DesignModeTogglerComponent {

    private _inDesignMode: boolean = false;

    constructor(
        private designModeService: DesignModeService,
        private authService: AuthService) {
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

    togleDesignMode() {
        let value = this.designModeService.isInDesignMode();
        this.designModeService.setInDesignMode(!value);
    }
}
