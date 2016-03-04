import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ProfileService {

    constructor(private Restangular: any) {

    }

    getProfileMembers(profileId: number, filters: any) {
        return this.Restangular.service('profiles').one(profileId).customGET("members", filters);
    }

}
