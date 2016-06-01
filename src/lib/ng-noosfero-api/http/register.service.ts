import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";

@Injectable()
@Inject("Restangular")
export class RegisterService {
    constructor(private Restangular: restangular.IService) {
        this.Restangular = Restangular;
    }

    createAccount(user: noosfero.User): ng.IPromise<noosfero.RestResult<noosfero.User>> {
        return this.Restangular.all("").customPOST(user, "register", user);
    }
}
