import { Input, Inject, Component, ViewEncapsulation } from '@angular/core';
import { AuthService, AuthEvents } from '../../../login';
import { SessionService } from '../../../login/session.service';

/**
 * @ngdoc controller
 * @name layout.blocks.LoginBlockComponent
 * @description
 *  The Noosfero block responible for presenting a login form and user status 
 */
@Component({
    selector: "noosfero-login-block",
    templateUrl: './login-block.html',
    styleUrls: ['./login-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

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
    credentials = <noosfero.Credentials>{};

    constructor(private session: SessionService,
        public authService: AuthService) {

        this.currentUser = this.session.currentUser();
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.currentUser = this.session.currentUser();
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
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
