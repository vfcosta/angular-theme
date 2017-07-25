import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {DesignModeService} from '../../shared/services/design-mode.service';
import {AuthService, AuthEvents} from '../../login';

@Component({
    selector: 'design-toggler',
    templateUrl: './design-mode-toggler.html',
    styleUrls: ['./design-mode-toggler.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DesignModeTogglerComponent {

    private _inDesignMode = false;

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
        const value = this.designModeService.isInDesignMode();
        this.designModeService.setInDesignMode(!value);
    }
}
