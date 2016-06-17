import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";
import {ProfileService} from "./profile.service";

@Injectable()
@Inject("Restangular", "$q", "$log", ProfileService)
export class PersonService extends RestangularService<noosfero.Person> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService, protected profileService: ProfileService) {
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

    getTags(profile: noosfero.Profile): ng.IPromise<noosfero.RestResult<any>> {
        let p = this.getElement(<number>profile.id).customGET('tags');
        let deferred = this.$q.defer<noosfero.RestResult<any>>();
        p.then(this.getHandleSuccessFunction<noosfero.RestResult<any>>(deferred));
        p.catch(this.getHandleErrorFunction<noosfero.RestResult<any>>(deferred));
        return deferred.promise;
    }
}
