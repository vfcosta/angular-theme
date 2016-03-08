import {Credentials} from "./../../models/interfaces";
import {AuthService} from "./auth_service";

export class AuthController {

    static $inject = ["$log", "$stateParams", "AuthService"];

    constructor(
        private noosfero: any,
        private $log: ng.ILogService,
        private $stateParams: any,
        private AuthService: AuthService
    ) {

    }

    credentials: Credentials;

    login() {
        this.AuthService.login(this.credentials);
    }
}