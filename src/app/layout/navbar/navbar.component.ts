import { HeaderService } from './../../shared/services/header.service';
import { Component, Inject, EventEmitter, Input } from "@angular/core";
import { AuthService, AuthController, AuthEvents } from "./../../login";
import { EnvironmentService } from "./../../../lib/ng-noosfero-api/http/environment.service";
import { BodyStateClassesService } from '../../shared/services/body-state-classes.service';
import { DesignModeTogglerComponent } from '../design-mode-toggler/design-mode-toggler.component';
import { SessionService } from '../../login/session.service.ng2';


@Component({
    selector: "noosfero-navbar",
    template: require("app/layout/navbar/navbar.html"),
})
export class NavbarComponent {

    private currentUser: noosfero.User;
    private modalInstance: ng.ui.bootstrap.IModalServiceInstance;
    public currentEnvironment: noosfero.Environment = <any>{ name: '' };

    constructor(
        headerService: HeaderService,
        @Inject("$uibModal") private $uibModal: ng.ui.bootstrap.IModalService,
        @Inject("authService") public authService: AuthService,
        private session: SessionService,
        @Inject("$state") private $state: ng.ui.IStateService,
        private environmentService: EnvironmentService
    ) {
        this.currentUser = this.session.currentUser();
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.currentEnvironment = environment;
        });

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            if (this.modalInstance) {
                this.modalInstance.close();
                this.modalInstance = null;
            }
            this.currentUser = this.session.currentUser();
            this.$state.go(this.$state.current, {}, { reload: true });  // TODO move to auth
        });

        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.session.currentUser();
        });

    }

    openLogin() {
        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/login/login.html',
            controller: AuthController,
            controllerAs: 'vm',
            bindToController: true
        });
    };

    logout() {
        this.authService.logout();
        this.$state.transitionTo('main.environment.home');
    };

    activate() {
        if (!this.currentUser) {
            this.openLogin();
        }
    }

}
