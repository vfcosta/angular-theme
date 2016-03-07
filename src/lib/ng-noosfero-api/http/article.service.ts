import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ArticleService {

    constructor(private Restangular: any) { }

    getByProfile(profileId: number, filters: any) {
        return this.Restangular.service('profiles').one(profileId).one('articles').get(filters);
    }

    getChildren(id: number, filters: any) {
        return this.Restangular.service('articles').one(id).customGET('children', filters);
    }



}
