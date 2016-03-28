import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class PersonService extends RestangularService<noosfero.Person> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "people";
    }

    getDataKeys() {
        return {
            singular: 'person',
            plural: 'people'
        };
    }

}
