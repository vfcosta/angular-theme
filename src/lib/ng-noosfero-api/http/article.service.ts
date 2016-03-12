import { Injectable, Inject } from "ng-forward";
import {Article} from "../../../app/models/interfaces";

@Injectable()
@Inject("Restangular", "$q")


export class ArticleService {

    constructor(private Restangular: restangular.IService, private $q: ng.IQService, private $log: ng.ILogService) { }

    create(profileId: number, article: Article) {
        return this.Restangular.one('profiles', profileId).customPOST(
            { article: article },
            'articles',
            {},
            { 'Content-Type': 'application/json' }
        );
    }

    // TODO create a handle ErrorFactory too and move handleSuccessFactory and handleErrorFactory
    // to a base class (of course we will have to creates a base class too)
    handleSuccessFactory<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
        let self = this;
        let successFunction = (response: restangular.IResponse): void => {
            this.$log.debug("Request successfull executed", this, response);
            deferred.resolve(response.data);
        };
        return successFunction;
    }

    // TODO -> change all Restangular services to this approach "Return promise to a specific type"
    //          it makes easy consume the service
    getByProfile<T>(profileId: number, params?: any): ng.IPromise<T> {
        let deferred = this.$q.defer<T>();
        this.Restangular.one('profiles', profileId).customGET('articles', params).then(this.handleSuccessFactory(deferred));
        return deferred.promise;
    }

    getChildren(articleId: number, params?: any) {
        return this.get(articleId).customGET('children', params);
    }

    private get(articleId: number) {
        return this.Restangular.one('articles', articleId);
    }

}
