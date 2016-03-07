import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ProfileService {

    constructor(private Restangular: any) {

    }

    getActivities(profileId: number, options: any = {}) {
        return this.get(profileId).customGET("activities", options);
    }

    get(profileId: number) {
        return this.Restangular.one('profiles', profileId);
    }

    getProfileMembers(profileId: number, filters: any) {
        return this.get(profileId).customGET("members", filters);
    }

    getByIdentifier(identifier: string) {
        return this.Restangular.one('profiles').get({ identifier: identifier });
    }

    getBoxes(profileId: number) {
        return this.get(profileId).customGET('boxes');
    }

}
