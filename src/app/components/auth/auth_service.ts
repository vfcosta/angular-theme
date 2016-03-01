import {Injectable, Inject} from "ng-forward";

import {Credentials} from "./../../models/interfaces";
import {Session} from "./session";
import {NoosferoRootScope} from "./noosfero_root_scope";
import {AUTH_EVENTS, IAuthEvents} from "./auth_events";

@Injectable
@Inject("$q", "$http", "$rootScope", Session, "$log", "AUTH_EVENTS")
export class AuthService {
    constructor(private $q: ng.IQService,
        private $http: ng.IHttpService,
        private $rootScope: NoosferoRootScope,
        private Session: Session,
        private $log: ng.ILogService,
        private AUTH_EVENTS: IAuthEvents) {

    }

    private loginSuccessCallback(response) {
        this.$log.debug('AuthService.login [SUCCESS] response', response);
        let currentUser = this.Session.create(response.data);
        this.$rootScope.currentUser = currentUser;
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess, currentUser);
        return currentUser;
    }

    login(credentials: Credentials) {
        let url = '/api/v1/login';
        let encodedData = 'login=' + credentials.username + '&password=' + credentials.password;
        return this.$http.post(url, encodedData).then(this.loginSuccessCallback, this.loginFailedCallback);
    }

    private loginFailedCallback(response) {
        this.$log.debug('AuthService.login [FAIL] response', response);
        this.$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        // return $q.reject(response);
        return null;
    }

    public logout() {
        this.Session.destroy();
        this.$rootScope.currentUser = undefined;
        this.$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        this.$http.jsonp('/account/logout'); //FIXME logout from noosfero to sync login state
    }

    public isAuthenticated() {
        return !!this.Session.getCurrentUser();
    }

    public isAuthorized(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (this.isAuthenticated() && authorizedRoles.indexOf(this.Session.getCurrentUser().userRole) !== -1);
    }
}