import {Component, Inject} from "ng-forward";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";


import {SessionService, AuthService, AuthController, IAuthEvents, AUTH_EVENTS} from "./../../login";

@Component({
    selector: "acme-navbar",
    templateUrl: "app/layout/navbar/navbar.html",
    directives: [LanguageSelectorComponent],
    providers: [AuthService, SessionService]
})
@Inject("$modal", AuthService, "SessionService", "$scope", "$state")
export class Navbar {

    private currentUser: noosfero.User;
    private modalInstance: any = null;
    /**
     *
     */
    constructor(
        private $modal: any,
        private authService: AuthService,
        private session: SessionService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService
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

    openLogin() {
        this.modalInstance = this.$modal.open({
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
