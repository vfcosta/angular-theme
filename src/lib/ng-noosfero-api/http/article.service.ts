import { Injectable, Inject } from "ng-forward";
import {Article} from "../../../app/models/interfaces";

@Injectable()
@Inject("Restangular")
export class ArticleService {

    constructor(private Restangular: any) {

    }

    create(profileId: number, article: Article) {
        return this.Restangular.one('profiles', profileId).customPOST(
            { article: article },
            'articles',
            {},
            { 'Content-Type': 'application/json' }
        );
    }

    get(articleId: number) {
        return this.Restangular.one('articles', articleId);
    }

    getByProfile(profileId: number, filters: any) {
        return this.Restangular.one('profiles', profileId).customGET('articles', filters);
    }

    getChildren(articleId: number, options: any = {}) {
        return this.get(articleId).customGET('children', options);
    }

}
