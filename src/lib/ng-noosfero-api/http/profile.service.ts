import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ProfileService {

    constructor(private restangular: restangular.IService) { }

    getByIdentifier(identifier: string): restangular.IPromise<any> {
        return this.restangular.one('profiles').get({ identifier: identifier });
    }

    getProfileMembers(profileId: number, params?: any): restangular.IPromise<any> {
        return this.get(profileId).customGET("members", params);
    }

    getBoxes(profileId: number): restangular.IPromise<any> {
        return this.get(profileId).customGET('boxes');
    }

    getActivities(profileId: number, params?: any): restangular.IPromise<any> {
        return this.get(profileId).customGET("activities", params);
    }

    get(profileId: number): restangular.IElement {
        return this.restangular.one('profiles', profileId);
    }

}
