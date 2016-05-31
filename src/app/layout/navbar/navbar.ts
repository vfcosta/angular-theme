import {Component, Inject, EventEmitter, Input} from "ng-forward";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {SessionService, AuthService, AuthController, AuthEvents} from "./../../login";
import {EnvironmentService} from "./../../../lib/ng-noosfero-api/http/environment.service";
import {SidebarNotificationService} from "../sidebar/sidebar.notification.service";
import {BodyStateClassesService} from '../services/body-state-classes.service';

@Component({
    selector: "acme-navbar",
    templateUrl: "app/layout/navbar/navbar.html",
    directives: [LanguageSelectorComponent],
    providers: [AuthService, SessionService, SidebarNotificationService, EnvironmentService]
})
@Inject("$uibModal", AuthService, "SessionService", "$state", SidebarNotificationService, BodyStateClassesService, EnvironmentService)
export class Navbar {

    private currentUser: noosfero.User;
    private modalInstance: any = null;
    public showHamburguer: boolean = false;
    public currentEnvironment: noosfero.Environment = <any>{ name: '' };

    /**
     *
     */
    constructor(
        private $uibModal: any,
        public authService: AuthService,
        private session: SessionService,
        private $state: ng.ui.IStateService,
        private sidebarNotificationService: SidebarNotificationService,
        private bodyStateService: BodyStateClassesService,
        private environmentService: EnvironmentService
    ) {
        this.currentUser = this.session.currentUser();
        this.currentEnvironment = environmentService.getCurrentEnviroment();

        this.showHamburguer = this.authService.isAuthenticated();
        this.bodyStateService.addContentClass(!this.sidebarNotificationService.sidebarVisible);

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            if (this.modalInstance) {
                this.modalInstance.close();
                this.modalInstance = null;
            }

            this.currentUser = this.session.currentUser();
            this.showHamburguer = true;

            this.$state.go(this.$state.current, {}, { reload: true });  // TODO move to auth
        });

        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            this.currentUser = this.session.currentUser();
        });

    }

    public toggleCollapse() {
        this.sidebarNotificationService.alternateVisibility();

        this.bodyStateService.addContentClass(!this.sidebarNotificationService.sidebarVisible);
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
        this.$state.go(this.$state.current, {}, { reload: true });  // TODO move to auth
    };

    activate() {
        if (!this.currentUser) {
            this.openLogin();
        }
    }

}
