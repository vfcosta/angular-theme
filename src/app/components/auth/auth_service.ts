import {Injectable, Inject} from "ng-forward";

import {Credentials, NoosferoRootScope, User, UserResponse} from "./../../models/interfaces";
import {Session} from "./session";

import {AUTH_EVENTS, IAuthEvents} from "./auth_events";

@Injectable()
@Inject("$q", "$http", "$rootScope", "Session", "$log", "AUTH_EVENTS")
export class AuthService {

    constructor(private $q: ng.IQService,
        private $http: ng.IHttpService,
        private $rootScope: NoosferoRootScope,
        private session: Session,
        private $log: ng.ILogService,
        private auth_events: IAuthEvents) {

    }

    loginFromCookie() {
        let url: string = '/api/v1/login_from_cookie';
        return this.$http.post(url, null).then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }


    private loginSuccessCallback(response: ng.IHttpPromiseCallbackArg<UserResponse>) {
        this.$log.debug('AuthService.login [SUCCESS] response', response);
        let currentUser: User = this.session.create(response.data);
        this.$rootScope.currentUser = currentUser;
        this.$rootScope.$broadcast(this.auth_events.loginSuccess, currentUser);
        return currentUser;
    }

    login(credentials: Credentials) {
        let url = '/api/v1/login';
        let encodedData = 'login=' + credentials.username + '&password=' + credentials.password;
        return this.$http.post(url, encodedData).then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }

    private loginFailedCallback(response: ng.IHttpPromiseCallbackArg<any>): any {
        this.$log.debug('AuthService.login [FAIL] response', response);
        this.$rootScope.$broadcast(this.auth_events.loginFailed);
        // return $q.reject(response);
        return null;
    }

    public logout() {
        this.session.destroy();
        this.$rootScope.currentUser = undefined;
        this.$rootScope.$broadcast(this.auth_events.logoutSuccess);
        this.$http.jsonp('/account/logout'); // FIXME logout from noosfero to sync login state
    }

    public isAuthenticated() {
        return !!this.session.getCurrentUser();
    }

    public isAuthorized(authorizedRoles: string | string[]) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [<string>authorizedRoles];
        }
        return (this.isAuthenticated() && authorizedRoles.indexOf(this.session.getCurrentUser().userRole) !== -1);
    }
}