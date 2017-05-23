import { Component, Inject, EventEmitter, Input } from "ng-forward";
import { SessionService, AuthService, AuthController, AuthEvents } from "./../../login";
import { EnvironmentService } from "./../../../lib/ng-noosfero-api/http/environment.service";
import { BodyStateClassesService } from '../../shared/services/body-state-classes.service';
import { DesignModeTogglerComponent } from '../design-mode-toggler/design-mode-toggler.component';

@Component({
    selector: "acme-navbar",
    templateUrl: "app/layout/navbar/navbar.html",
    providers: [AuthService, SessionService, EnvironmentService]
})
@Inject("$uibModal", AuthService, "SessionService", "$state", BodyStateClassesService, EnvironmentService)
export class Navbar {

    private currentUser: noosfero.User;
    private modalInstance: ng.ui.bootstrap.IModalServiceInstance;
    public currentEnvironment: noosfero.Environment = <any>{ name: '' };
    /**
     *
     */
    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        public authService: AuthService,
        private session: SessionService,
        private $state: ng.ui.IStateService,
        private bodyStateService: BodyStateClassesService,
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
