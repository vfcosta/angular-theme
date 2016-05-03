import {Input, Inject, Component} from "ng-forward";
import {SessionService, AuthService, IAuthEvents, AUTH_EVENTS} from "./../../../login";

/**
 * @ngdoc controller
 * @name layout.blocks.LoginBlockComponent
 * @description
 *  The Noosfero block responible for presenting a login form and user status 
 */
@Component({
    selector: "noosfero-login-block",
    templateUrl: 'app/layout/blocks/login-block/login-block.html',
})
@Inject("SessionService", "$state", 'AuthService', "$scope")
export class LoginBlockComponent {

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf layout.blocks.LoginBlockComponent
     * @description
     *  The current loged in user
     */
    currentUser: noosfero.User;

    /**
     * @ngdoc property
     * @name credentials
     * @propertyOf layout.blocks.LoginBlockComponent
     * @description
     *  The credentials of the currentUser
     */
    credentials: noosfero.Credentials;

    constructor(
        private session: SessionService,
        private $state: ng.ui.IStateService,
        private authService: AuthService,
        private $scope: ng.IScope) {
        this.currentUser = this.session.currentUser();

        this.$scope.$on(AUTH_EVENTS.loginSuccess, () => {
            this.currentUser = this.session.currentUser();
            console.debug("User: ", this.currentUser);
        });

        this.$scope.$on(AUTH_EVENTS.logoutSuccess, () => {
            this.currentUser = this.session.currentUser();
        });

    }

    /**
     * @ngdoc method
     * @name login
     * @methodOf layout.blocks.LoginBlockComponent
     * @description
     *  Logs in the user using its credentials
     */
    login() {
        this.authService.login(this.credentials);
    }

    /**
     * @ngdoc method
     * @name logout
     * @methodOf layout.blocks.LoginBlockComponent
     * @description
     *  Logout the user
     */
    logout() {
        this.authService.logout();
    };
}
