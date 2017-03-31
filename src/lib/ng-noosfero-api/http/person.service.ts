import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";
import { ProfileService } from "./profile.service";

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

    getFriends(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getElement(profileId).customGET("friends", params);
    }

    getCommunities(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getElement(profileId).customGET("communities", params);
    }

    isFriend(profileId: number, friendId: number, params?: any): restangular.IPromise<any> {
        return this.getElement(profileId).customGET("friends/" + friendId, params);
    }

    addFriend(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getElement(profileId).customPOST(params, "friends");
    }

    removeFriend(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getElement(profileId).customDELETE("friends", params);
    }

    getTags(profile: noosfero.Profile): ng.IPromise<noosfero.RestResult<any>> {
        let p = this.getElement(<number>profile.id).customGET('tags');
        let deferred = this.$q.defer<noosfero.RestResult<any>>();
        p.then(this.getHandleSuccessFunction<noosfero.RestResult<any>>(deferred));
        p.catch(this.getHandleErrorFunction<noosfero.RestResult<any>>(deferred));
        return deferred.promise;
    }

    uploadImage(profile: noosfero.Profile, base64ImageJson: any) {
        let headers = { 'Content-Type': 'application/json' };
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Profile>>();
        // TODO dynamically copy the selected attributes to update
        let attributesToUpdate: any = {
            person: { image_builder: base64ImageJson }
        };
        let restRequest: ng.IPromise<noosfero.RestResult<any>> =
            this.getElement(profile.id).customPOST(attributesToUpdate, null, null, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

}
