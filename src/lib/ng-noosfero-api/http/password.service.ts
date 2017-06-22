import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class PasswordService {
    constructor(protected restangular: Restangular) { }

    newPassword(code: string, password: string, password_confirmation: string): Promise<noosfero.RestResult<noosfero.User>> {
        return this.restangular.all("").customOperation("patch", "new_password", { code: code, password: password, password_confirmation: password_confirmation }).toPromise();
    }
}
