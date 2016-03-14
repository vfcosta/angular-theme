import { Injectable, Inject } from "ng-forward";
import {RestangularWrapperService} from "./restangular_wrapper_service";
@Injectable()
@Inject("Restangular", "$q")

export class ArticleService extends RestangularWrapperService<noosfero.Article> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getPath() {
        return "articles";
    }

    getDataKeys() {
        return {
            singular: 'article',
            plural: 'articles'
        };
    }

    create(profileId: number, article: noosfero.Article): ng.IPromise<noosfero.Article> {
        return this.post<noosfero.Article>(this.Restangular.one('profiles', profileId), article);
    }

    //     // TODO create a handle ErrorFactory too and move handleSuccessFactory and handleErrorFactory
    //     // to a base class (of course we will have to creates a base class too)
    //     handleSuccessFactory<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
    //         let self = this;
    //         let successFunction = (response: restangular.IResponse): void => {
    //             this.$log.debug("Request successfull executed", self, response);
    //             deferred.resolve(response.data);
    //         };
    //         return successFunction;
    //     }
    // 
    //     handleErrorFactory<T>(deferred: ng.IDeferred<T>): (response: restangular.IResponse) => void {
    //         let self = this;
    //         let successFunction = (response: restangular.IResponse): void => {
    //             this.$log.error("Error executing request", self, response);
    //             deferred.reject(response.data);
    //         };
    //         return successFunction;
    //     }

    // TODO -> change all Restangular services to this approach "Return promise to a specific type"
    //          it makes easy consume the service
    getByProfile<T>(profileId: number, params?: any): ng.IPromise<T> {
        let deferred = this.$q.defer<T>();
        this.Restangular.one('profiles', profileId).customGET('articles', params)
            .then(this.getHandleSuccessFunction<T>(deferred, 'articles'))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

    getChildren<T>(articleId: number, params?: any): ng.IPromise<T> {
        let deferred = this.$q.defer<T>();

        this.get(articleId).customGET('children', params)
            .then(this.getHandleSuccessFunction<T>(deferred, 'articles').bind(this))
            .catch(this.getHandleErrorFunction(deferred));

        return deferred.promise;
    }



}
