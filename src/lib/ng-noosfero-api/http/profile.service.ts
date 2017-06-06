import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

export const MemebershipStatus = {
    NotMember: 0,
    WaitingForApproval: 1,
    Member: 2
};

@Injectable()
@Inject("Restangular", "$q")
export class ProfileService extends RestangularService<noosfero.Profile> {


    private _currentProfilePromise: ng.IDeferred<noosfero.Profile>;

    constructor(private restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(restangular, $q, $log);
        this.resetCurrentProfile();
    }

    getResourcePath() {
        return "profiles";
    }

    getDataKeys() {
        return {
            singular: 'profile',
            plural: 'profiles'
        };
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

    setCurrentProfileByIdentifier(identifier: string): ng.IPromise<noosfero.Profile> {
        this.resetCurrentProfile();
        return this.getByIdentifier(identifier).then((profile: noosfero.Profile) => {
            this.setCurrentProfile(profile);
            return this.getCurrentProfile();
        });
    }

    getHomePage(profileId: number, params?: any) {
        return this.getProfileElement(profileId).customGET("home_page", params);
    }

    getByIdentifier(identifier: string): ng.IPromise<noosfero.Profile> {
        let p = this.restangular.one('profiles', identifier).get({ key: "identifier" });
        return p.then((response: restangular.IResponse) => {
            if (response.status === 404) {
                return this.$q.reject(p);
            }
            return response.data;
        });
    }

    getProfileMembers(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getProfileElement(profileId).customGET("members", params);
    }

    getBoxes(profileId: number): restangular.IPromise<restangular.IResponse> {
        return this.getProfileElement(profileId).customGET('boxes');
    }

    getActivities(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getProfileElement(profileId).customGET("activities", params);
    }

    getNetworkActivities(profileId: number, params?: any): restangular.IPromise<any> {
        return this.getProfileElement(profileId).customGET("network_activities", params);
    }

    getProfileElement(profileId: number): restangular.IElement {
        return this.restangular.one('profiles', profileId);
    }

    update(profile: noosfero.Profile) {
        let headers = { 'Content-Type': 'application/json' };
        return this.getProfileElement(profile.id).customPOST({ profile: profile }, null, null, headers);
    }

    getMembers(profile: noosfero.Profile, params?: any) {
        let p = this.getProfileElement(profile.id);
        return p.customGET('members', params);
    }

    getMembershipState(person: noosfero.Person, profile: noosfero.Profile) {
        let deferred = this.$q.defer();
        if (person) {
            this.getProfileElement(profile.id).customGET('membership', { identifier: person.identifier }).then((result: any) => {
                deferred.resolve(result.data.membership_state);
            });
        } else {
            deferred.resolve(0);
        }
        return deferred.promise;
    }

    isMember(person: noosfero.Person, profile: noosfero.Profile) {
        let deferred = this.$q.defer();
        if (person) {
            this.getMembers(profile, { identifier: person.identifier }).then((result: any) => {
                deferred.resolve(result.data.length > 0);
            });
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    addMember(person: noosfero.Person, profile: noosfero.Profile) {
        return this.getProfileElement(profile.id).customPOST({}, "members", null, null);
    }

    removeMember(person: noosfero.Person, profile: noosfero.Profile) {
        return this.getProfileElement(profile.id).customDELETE("members", null, null);
    }

    uploadImage(profile: noosfero.Profile, base64ImageJson: any, type: string) {
        let headers = { 'Content-Type': 'application/json' };
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Profile>>();
        // TODO dynamically copy the selected attributes to update
        let attributesToUpdate: any = {
            profile: { image_builder: base64ImageJson }
        };
        if (type === "top") {
            attributesToUpdate = {
                profile: { top_image_builder: base64ImageJson }
            };
        }

        let restRequest: ng.IPromise<noosfero.RestResult<any>> =
            this.getProfileElement(profile.id).customPOST(attributesToUpdate, null, null, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }
}
