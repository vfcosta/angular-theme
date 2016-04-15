import {Injectable, Inject, EventEmitter} from "ng-forward";

import {NoosferoRootScope, UserResponse} from "./../shared/models/interfaces";
import {SessionService} from "./session.service";

import {AuthEvents} from "./auth-events";

@Injectable()
@Inject("$q", "$http", "SessionService", "$log")
export class AuthService {

    public loginSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();
    private loginFailed: EventEmitter<ng.IHttpPromiseCallbackArg<any>> = new EventEmitter<ng.IHttpPromiseCallbackArg<any>>();
    private logoutSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();

    constructor(private $q: ng.IQService,
        private $http: ng.IHttpService,
        private sessionService: SessionService,
        private $log: ng.ILogService) {

    }

    loginFromCookie() {
        let url: string = '/api/v1/login_from_cookie';
        return this.$http.post(url, null).then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }


    private loginSuccessCallback(response: ng.IHttpPromiseCallbackArg<UserResponse>) {
        this.$log.debug('AuthService.login [SUCCESS] response', response);
        let currentUser: noosfero.User = this.sessionService.create(response.data);
        this.loginSuccess.next(currentUser);

        return currentUser;
    }

    login(credentials: noosfero.Credentials): ng.IPromise<noosfero.User> {
        let url = '/api/v1/login';
        let encodedData = 'login=' + credentials.username + '&password=' + credentials.password;
        return this.$http.post(url, encodedData).then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }

    private loginFailedCallback(response: ng.IHttpPromiseCallbackArg<any>): any {
        this.$log.debug('AuthService.login [FAIL] response', response);
        this.loginFailed.next(response);
        // return $q.reject(response);
        return null;
    }

    public logout() {
        let user: noosfero.User = this.sessionService.currentUser();
        this.sessionService.destroy();

        this.logoutSuccess.next(user);
        this.$http.jsonp('/account/logout'); // FIXME logout from noosfero to sync login state
    }

    public isAuthenticated() {
        return !!this.sessionService.currentUser();
    }

    public currentUser(): noosfero.User {
        return this.sessionService.currentUser();
    }

    public isAuthorized(authorizedRoles: string | string[]) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [<string>authorizedRoles];
        }
        return (this.isAuthenticated() && authorizedRoles.indexOf(this.sessionService.currentUser().userRole) !== -1);
    }

    subscribe(eventName: string, fn: Function) {

        if (this[eventName]) {
            this[eventName].subscribe(fn);
        } else {
            throw new Error(`The event: ${eventName} not exists`);
        }
    }
}
