import {Component, Inject} from "ng-forward";


import {Session, AuthService, AuthController, IAuthEvents, AUTH_EVENTS} from "./../auth";
import {User} from "./../../models/interfaces";

@Component({
    selector: "acme-navbar",
    templateUrl: "app/components/navbar/navbar.html",
    providers: [AuthService, Session]
})
@Inject("$modal", AuthService, "Session", "$scope", "$state")
export class Navbar {

    private currentUser: User;
    private modalInstance: any = null;
    /**
     *
     */
    constructor(
        private $modal: any,
        private authService: AuthService,
        private session: Session,
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
            templateUrl: 'app/components/auth/login.html',
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
