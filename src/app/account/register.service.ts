import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "../../lib/ng-noosfero-api/http/restangular_service";

@Injectable()
@Inject("Restangular")
export class RegisterService {

    constructor(private Restangular: restangular.IService) { }

    createAccount(user: noosfero.User): ng.IPromise<noosfero.RestResult<noosfero.User>> {
        return this.Restangular.customPOST({account: user}, "register", null);
    }
}
