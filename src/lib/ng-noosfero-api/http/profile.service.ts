import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular", "$q")
export class ProfileService {

    private _currentProfilePromise: ng.IDeferred<noosfero.Profile>;

    constructor(private restangular: restangular.IService, private $q: ng.IQService) {
        this.resetCurrentProfile();
    }

    resetCurrentProfile() {
        this._currentProfilePromise = this.$q.defer();
    }

    getCurrentProfile(): ng.IPromise<noosfero.Profile> {
        return this._currentProfilePromise.promise;
    }

    setCurrentProfile(profile: noosfero.Profile) {
        this._currentProfilePromise.resolve(profile);
    }

    setCurrentProfileByIdentifier(identifier: string) {
        this.resetCurrentProfile();
        return this.getByIdentifier(identifier).then((profile: noosfero.Profile) => {
            this.setCurrentProfile(profile);
            return this.getCurrentProfile();
        });
    }

    getHomePage(profileId: number, params?: any) {
        return this.get(profileId).customGET("home_page", params);
    }

    getByIdentifier(identifier: string): ng.IPromise<noosfero.Profile> {
        let p = this.restangular.one('profiles').get({ identifier: identifier });
        return p.then((response: restangular.IResponse) => {
            if (response.data.length === 0) {
                return this.$q.reject(p);
            }
            return response.data[0];
        });
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

    update(profile: noosfero.Profile) {
        let headers = { 'Content-Type': 'application/json' };
        return this.get(profile.id).customPOST({ profile: profile }, null, null, headers);
    }
}
