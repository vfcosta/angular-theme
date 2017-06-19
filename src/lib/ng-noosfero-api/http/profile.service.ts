import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import { RestangularService } from "./restangular_service.ng2";

export const MembershipStatus = {
    NotMember: 0,
    WaitingForApproval: 1,
    Member: 2
};

@Injectable()
export class ProfileService extends RestangularService<noosfero.Profile> {

    constructor(protected restangular: Restangular) {
        super(restangular);
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
        this.resetCurrent();
    }

    getCurrentProfile(): Promise<noosfero.Profile> {
        return this.getCurrent();
    }

    setCurrentProfile(profile: noosfero.Profile) {
        this.setCurrent(profile);
    }

    setCurrentProfileByIdentifier(identifier: string): Promise<noosfero.Profile> {
        this.resetCurrentProfile();
        return this.getByIdentifier(identifier).then((profile: noosfero.Profile) => {
            this.setCurrentProfile(profile);
            return this.getCurrentProfile();
        });
    }

    getHomePage(profileId: number, params?: any) {
        return this.getProfileElement(profileId).customGET("home_page", params);
    }

    getByIdentifier(identifier: string): Promise<noosfero.Profile> {
        let p = this.restangular.one('profiles', identifier).get({ key: "identifier" }).toPromise();
        return p.then((response: restangular.IResponse) => {
            if (response.status === 404) {
                return Promise.reject(p);
            }
            return response.data;
        });
    }

    getProfileMembers(profileId: number, params?: any): Promise<any> {
        return this.getProfileElement(profileId).customGET("members", params).toPromise();
    }

    getBoxes(profileId: number): Promise<restangular.IResponse> {
        return this.getProfileElement(profileId).customGET('boxes').toPromise();
    }

    getActivities(profileId: number, params?: any): Promise<restangular.IResponse> {
        return this.getProfileElement(profileId).customGET("activities", params).toPromise();
    }

    getNetworkActivities(profileId: number, params?: any): Promise<restangular.IResponse> {
        return this.getProfileElement(profileId).customGET("network_activities", params).toPromise();
    }

    getProfileElement(profileId: number) {
        return this.restangular.one('profiles', profileId);
    }

    update(profile: noosfero.Profile) {
        let headers = { 'Content-Type': 'application/json' };
        return this.getProfileElement(profile.id).customPOST({ profile: profile }, null, null, headers).toPromise();
    }

    getMembers(profile: noosfero.Profile, params?: any) {
        let p = this.getProfileElement(profile.id);
        return p.customGET('members', params).toPromise();
    }

    isMember(person: noosfero.Person, profile: noosfero.Profile) {
        if (person) {
            return this.getMembers(profile, { identifier: person.identifier }).then((result: any) => {
                return result.data.length > 0;
            });
        } else {
            return Promise.resolve(false);
        }
    }

    addMember(person: noosfero.Person, profile: noosfero.Profile) {
        return this.getProfileElement(profile.id).customPOST({}, "members", null, null).toPromise();
    }

    removeMember(person: noosfero.Person, profile: noosfero.Profile) {
        return this.getProfileElement(profile.id).customDELETE("members", null, null).toPromise();
    }

    uploadImage(profile: noosfero.Profile, base64ImageJson: any, type: string) {
        let headers = { 'Content-Type': 'application/json' };
        // TODO dynamically copy the selected attributes to update
        let attributesToUpdate: any = {
            profile: { image_builder: base64ImageJson }
        };
        if (type === "top") {
            attributesToUpdate = {
                profile: { top_image_builder: base64ImageJson }
            };
        }
        let restRequest = this.getProfileElement(profile.id).customPOST(attributesToUpdate, null, null, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    getBlockTemplate(id: number, blockType: string) {
        let params = { 'block_type': blockType };
        return this.getProfileElement(id).customGET("blocks/preview", params);
    }
}
