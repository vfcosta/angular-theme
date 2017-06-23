import { Restangular } from 'ngx-restangular';
import { Injectable } from "@angular/core";

@Injectable()
export class RegisterService {
    constructor(protected restangular: Restangular) { }

    createAccount(user: noosfero.User): Promise<noosfero.RestResult<noosfero.User>> {
        return this.restangular.all("").customPOST(user, "register", user).toPromise();
    }
}
