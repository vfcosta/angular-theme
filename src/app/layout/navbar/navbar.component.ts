import { Router } from '@angular/router';
import { HeaderService } from './../../shared/services/header.service';
import { Component, Inject, EventEmitter, Input } from "@angular/core";
import { AuthService, AuthEvents } from "./../../login";
import { EnvironmentService } from "./../../../lib/ng-noosfero-api/http/environment.service";
import { DesignModeTogglerComponent } from '../design-mode-toggler/design-mode-toggler.component';
import { SessionService } from '../../login/session.service';


@Component({
    selector: "noosfero-navbar",
    template: require("app/layout/navbar/navbar.html"),
})
export class NavbarComponent {

    private currentUser: noosfero.User;
    public currentEnvironment: noosfero.Environment = <any>{ name: '' };
    showLoginModal = false;

    constructor(
        headerService: HeaderService,
        public authService: AuthService,
        private session: SessionService,
        @Inject("Window") private window: Window,
        private environmentService: EnvironmentService
    ) {
        this.currentUser = this.session.currentUser();
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.currentEnvironment = environment;
        });

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.showLoginModal = false;
            this.currentUser = this.session.currentUser();
            window.location.reload();
        });

        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.session.currentUser();
        });
    }

    logout() {
        this.authService.logout();
    };

    openLogin() {
        this.showLoginModal = true;
    }

    activate() {
        if (!this.currentUser) {
            this.openLogin();
        }
    }
}
