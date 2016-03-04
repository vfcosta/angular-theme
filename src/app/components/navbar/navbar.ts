import {Component, Inject} from "ng-forward";


import {Session, AuthService, IAuthEvents} from "./../auth";
import {User} from "./../../models/interfaces";

@Component({
    selector: "acme-navbar",
    templateUrl: "app/components/navbar/navbar.html"
})
@Inject("moment", "$modal", "AuthService", "Session", "$scope", "$state", "AUTH_EVENTS")
export class Navbar {

    private currentUser: User;
    private modalInstance: any = null;
    /**
     *
     */
    constructor(
        private moment: moment.MomentStatic,
        private $modal: any,
        private authService: AuthService,
        private session: Session,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private AUTH_EVENTS: IAuthEvents
    ) {

        this.currentUser = session.currentUser();

        $scope.$on(AUTH_EVENTS.loginSuccess, function() {
            if (this.modalInstance) {
                this.modalInstance.close();
                this.modalInstance = null;
            }

            this.$state.go(this.$state.current, {}, { reload: true }); //TODO move to auth
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, () => {
            this.currentUser = this.session.currentUser();
        });

    }

    openLogin() {
        this.modalInstance = this.$modal.open({
            templateUrl: 'app/components/auth/login.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            bindToController: true
        });
    };

    logout() {
        this.authService.logout();
        this.$state.go(this.$state.current, {}, { reload: true });  //TODO move to auth
    };



    activate() {
        if (!this.currentUser) {
            this.openLogin();
        }
    }

}