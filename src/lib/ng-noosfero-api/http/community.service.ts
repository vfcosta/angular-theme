import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";
import {PersonService} from "./person.service";

declare var _: any;

@Injectable()
@Inject("Restangular", "$q", "$log", PersonService)
export class CommunityService extends RestangularService<noosfero.Community> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService, protected personService: PersonService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "communities";
    }

    getDataKeys() {
        return {
            singular: 'community',
            plural: 'communities'
        };
    }

    createNewCommunity(community: noosfero.Community){
        let headers = {
            'Content-Type': 'application/json'
        };
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
        let attributesToUpdate: any = {
            community: Object.assign({}, _.omitBy(_.pick(community, ['name', 'closed']), _.isNull))
        };
        let restRequest: ng.IPromise<noosfero.RestResult<noosfero.Article>> = this.getElement(null).customPOST(attributesToUpdate, null, null, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

    getByOwner(owner: any, params?: any) {
        // TODO see a better way to verify the owner type
        if (owner.type === "Person") {
            return this.getByPerson(owner, params);
        } else {
            return this.getByEnvironment(params);
        }
    }

    getByEnvironment(params?: any) {
        return this.list(null, params);
    }

    getByPerson(person: noosfero.Person, params?: any) {
        let personElement = this.personService.getElement(person.id);
        return this.list(personElement, params);
    }
}
