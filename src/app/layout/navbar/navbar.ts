import {Component, Inject, EventEmitter, Input} from "ng-forward";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {SessionService, AuthService, AuthController, AuthEvents} from "./../../login";
import {SidebarNotificationService} from "../sidebar/sidebar.notification.service";

@Component({
    selector: "acme-navbar",
    templateUrl: "app/layout/navbar/navbar.html",
    directives: [LanguageSelectorComponent],
    providers: [AuthService, SessionService, SidebarNotificationService]
})
@Inject("$uibModal", AuthService, "SessionService", "$state", SidebarNotificationService)
export class Navbar {

    private currentUser: noosfero.User;
    private modalInstance: any = null;

    public showHamburguer: boolean = false;

    /**
     *
     */
    constructor(
        private $uibModal: any,
        public authService: AuthService,
        private session: SessionService,
        private $state: ng.ui.IStateService,
        private sidebarNotificationService: SidebarNotificationService
    ) {
        this.currentUser = this.session.currentUser();

        this.showHamburguer = this.authService.isAuthenticated();

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
