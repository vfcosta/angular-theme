import { Injectable, Inject } from "ng-forward";

@Injectable()
@Inject("Restangular")
export class ArticleService {

    constructor(private Restangular: any) { }

    getByProfile(profileId: number, filters: any) {
        return this.Restangular.one('profiles', profileId).customGET('articles', filters);
    }

    getChildren(id: number, filters: any) {
        return this.Restangular.service('articles').one(id).customGET('children', filters);
    }



}
