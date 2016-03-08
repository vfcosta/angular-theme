import { Injectable, Inject } from "ng-forward";
import {Profile} from "../../../app/models/interfaces";

@Injectable()
@Inject("Restangular", "$q")
export class ProfileService {

    private _currentProfilePromise: ng.IDeferred<Profile>;

    constructor(private restangular: restangular.IService, $q: ng.IQService) {
        this._currentProfilePromise = $q.defer();
    }

    getCurrentProfile(): ng.IPromise<Profile> {
        return this._currentProfilePromise.promise;
    }

    setCurrentProfile(profile: Profile) {
        this._currentProfilePromise.resolve(profile);
    }

    getHomePage(profileId: number, params?: any) {
        return this.get(profileId).customGET("home_page", params);
    }

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
