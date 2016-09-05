import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular")
export class PasswordService {
    constructor(private Restangular: restangular.IService) {
        this.Restangular = Restangular;
    }

    newPassword(code: string, password: string, password_confirmation: string): ng.IPromise<noosfero.RestResult<noosfero.User>> {
        return this.Restangular.all("").customOperation("patch", "new_password", { code: code, password: password, password_confirmation: password_confirmation });
    }
}
