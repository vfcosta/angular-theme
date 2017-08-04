import { Restangular } from 'ngx-restangular';
import { PersonService } from './../../lib/ng-noosfero-api/http/person.service';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { SessionService } from './session.service';
import { Http, Jsonp, Response } from '@angular/http';

@Injectable()
export class AuthService {

    public loginSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();
    public loginFailed: EventEmitter<any> = new EventEmitter<any>();
    public logoutSuccess: EventEmitter<noosfero.User> = new EventEmitter<noosfero.User>();

    constructor(private http: Http,
        private jsonp: Jsonp,
        private sessionService: SessionService,
        private restangular: Restangular,
        private personService: PersonService
    ) {
        this.reloadUser();
    }

    loginFromCookie() {
        if (this.sessionService.currentUser()) return;
        
        const url = '/api/v1/login_from_cookie';
        return this.http.post(url, null).toPromise().then(this.loginSuccessCallback.bind(this), this.loginFailedCallback.bind(this));
    }

    reloadUser() {
        this.personService.getLoggedPerson().then((result: noosfero.RestResult<noosfero.Person>) => {
            this.currentUser().person = result.data;
            //FIXME remove this code
            // const person = result.data;
            // const user = person['user'];
            // user.person = person;
            // person['user'] = null;
            this.loginSuccessCallback({data: this.currentUser()});
        }).catch((error: any) => {
            this.logout();
        });
    }

    private loginSuccessCallback(response: any) {
        const currentUser: noosfero.User = this.sessionService.create(response.data);
        this.loginSuccess.next(currentUser);
        return currentUser;
    }

    login(credentials: noosfero.Credentials): Promise<noosfero.User> {
        const data = new FormData();
        data.append('login', credentials.username);
        data.append('password', credentials.password);
        return this.restangular.all("")
            .customPOST(data, "login", null, { 'Content-Type': undefined }).toPromise().then(
            (response: any) => this.loginSuccessCallback(response)).catch(
            (e: any) => {
                this.loginFailedCallback(e);
                throw e;
            });
    }

    private loginFailedCallback(response: any): any {
        this.loginFailed.next(response);
        return null;
    }

    public logout() {
        const user: noosfero.User = this.sessionService.currentUser();
        this.sessionService.destroy();
        this.logoutSuccess.next(user);
        // this.jsonp.get('/account/logout') // logout from noosfero to sync login state
        // this.jsonp.get('/account/logout').subscribe(); // logout from noosfero to sync login state
    }

    public isAuthenticated() {
        return !!this.sessionService.currentUser();
    }

    public currentUser(): noosfero.User {
        return this.sessionService.currentUser();
    }

    public isAuthorized(authorizedRoles: string | string[]) {
        if (!(authorizedRoles instanceof Array)) {
            authorizedRoles = [<string>authorizedRoles];
        }
        return (this.isAuthenticated() && authorizedRoles.indexOf(this.sessionService.currentUser().userRole) !== -1);
    }

    subscribe(eventName: string, fn: Function) {

        const event: EventEmitter<any> = <EventEmitter<any>>(<any>this)[eventName];
        if (event) {
            event.subscribe(fn);
        } else {
            throw new Error(`The event: ${eventName} not exists`);
        }
    }

    forgotPassword(value: string): Promise<noosfero.RestResult<any>> {
        return this.restangular.all("").customPOST("", "forgot_password", { value: value }).toPromise();
    }

}
