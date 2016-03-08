import { Injectable, Inject } from "ng-forward";
import {Article} from "../../../app/models/interfaces";

@Injectable()
@Inject("Restangular")
export class ArticleService {

    constructor(private Restangular: any) { }

    create(profileId: number, article: Article) {
        return this.Restangular.one('profiles', profileId).customPOST(
            { article: article },
            'articles',
            {},
            { 'Content-Type': 'application/json' }
        );
    }

    getByProfile(profileId: number, params?: any) {
        return this.Restangular.one('profiles', profileId).customGET('articles', params);
    }

    getChildren(articleId: number, params?: any) {
        return this.get(articleId).customGET('children', params);
    }

    private get(articleId: number) {
        return this.Restangular.one('articles', articleId);
    }

}
