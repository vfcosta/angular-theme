import {Component, Inject, EventEmitter, Input} from "ng-forward";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {SessionService, AuthService, AuthController, IAuthEvents, AUTH_EVENTS} from "./../../login";
import {SidebarNotificationService} from "../sidebar/sidebar.notification.service";

@Component({
    selector: "acme-navbar",
    templateUrl: "app/layout/navbar/navbar.html",
    directives: [LanguageSelectorComponent],
    providers: [AuthService, SessionService, SidebarNotificationService]
})
@Inject("$uibModal", AuthService, "SessionService", "$scope", "$state", SidebarNotificationService)
export class Navbar {

    private currentUser: noosfero.User;
    private modalInstance: any = null;
    /**
     *
     */
    constructor(
        private $uibModal: any,
        private authService: AuthService,
        private session: SessionService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private sidebarNotificationService: SidebarNotificationService
    ) {
        this.currentUser = this.session.currentUser();

        this.$scope.$on(AUTH_EVENTS.loginSuccess, () => {
            if (this.modalInstance) {
                this.modalInstance.close();
                this.modalInstance = null;
            }

            this.$state.go(this.$state.current, {}, { reload: true }); // TODO move to auth
        });

        this.$scope.$on(AUTH_EVENTS.logoutSuccess, () => {
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
