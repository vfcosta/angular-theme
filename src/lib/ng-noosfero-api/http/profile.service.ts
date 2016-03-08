import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ProfileService {

    constructor(private Restangular: any) { }

    getByIdentifier(identifier: string) {
        return this.Restangular.one('profiles').get({ identifier: identifier });
    }

    getProfileMembers(profileId: number, params?: any) {
        return this.get(profileId).customGET("members", params);
    }

    getBoxes(profileId: number) {
        return this.get(profileId).customGET('boxes');
    }

    getActivities(profileId: number, params?: any) {
        return this.get(profileId).customGET("activities", params);
    }

    private get(profileId: number) {
        return this.Restangular.one('profiles', profileId);
    }

}
