import {AuthService} from "./auth_service";

export class AuthController {

    static $inject = ["$log", "$stateParams", "AuthService"];

    constructor(
        private $log: ng.ILogService,
        private $stateParams: any,
        private AuthService: AuthService
    ) {

    }

    credentials: noosfero.Credentials;

    login() {
        this.AuthService.login(this.credentials);
    }
}
