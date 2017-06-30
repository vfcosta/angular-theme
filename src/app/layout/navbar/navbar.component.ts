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
        private router: Router,
        private environmentService: EnvironmentService
    ) {
        this.currentUser = this.session.currentUser();
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.currentEnvironment = environment;
        });

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.showLoginModal = false;
            this.currentUser = this.session.currentUser();
            // this.router.navigate(this.$state.current, {}, { reload: true });  // TODO move to auth
        });

        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.session.currentUser();
        });
    }

    logout() {
        this.authService.logout();
        // this.$state.transitionTo('main.environment.home');
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
