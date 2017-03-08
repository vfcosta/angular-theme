import { Injectable, Inject, EventEmitter } from "ng-forward";

import { NoosferoRootScope } from "./../shared/models/interfaces";
import { SessionService } from "./session.service";

import { AuthEvents } from "./auth-events";

@Injectable()
@Inject("$http", SessionService, "$log", "Restangular")
export class AuthService {

    public loginSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();
    public loginFailed: EventEmitter<ng.IHttpPromiseCallbackArg<any>> = new EventEmitter<ng.IHttpPromiseCallbackArg<any>>();
    public logoutSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();

    constructor(private $http: ng.IHttpService,
        private sessionService: SessionService,
        private $log: ng.ILogService,
        private Restangular: restangular.IService
    ) {
        this.Restangular = Restangular;
    }

    loginFromCookie() {
        if (this.sessionService.currentUser()) return;
        let url: string = '/api/v1/login_from_cookie';
        return this.$http.post(url, null).then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }


    private loginSuccessCallback(response: ng.IHttpPromiseCallbackArg<noosfero.User>) {
        this.$log.debug('AuthService.login [SUCCESS] response', response);
        let currentUser: noosfero.User = this.sessionService.create(response.data);
        this.loginSuccess.next(currentUser);

        return currentUser;
    }

    login(credentials: noosfero.Credentials): ng.IPromise<noosfero.User> {
        let data = new FormData();
        data.append('login', credentials.username);
        data.append('password', credentials.password);
        return this.Restangular.all("")
            .customPOST(data, "login", null, {'Content-Type': undefined}).then(
                (response: any) => this.loginSuccessCallback(response)).catch(
                (e: any) => {
                    this.loginFailedCallback(e);
                    throw e;
                });
    }

    private loginFailedCallback(response: ng.IHttpPromiseCallbackArg<any>): any {
        this.$log.debug('AuthService.login [FAIL] response', response);
        this.loginFailed.next(response);
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

        let event: EventEmitter<any> = <EventEmitter<any>>(<any>this)[eventName];
        if (event) {
            event.subscribe(fn);
        } else {
            throw new Error(`The event: ${eventName} not exists`);
        }
    }

    forgotPassword(value: string): ng.IPromise<noosfero.RestResult<any>> {
        return this.Restangular.all("").customPOST("", "forgot_password", { value: value });
    }

}
