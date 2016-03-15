import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "./restangular_service";
import {ProfileService} from "./profile.service";

@Injectable()
@Inject("Restangular", "$q", "$log", ProfileService)

export class ArticleService extends RestangularService<noosfero.Article> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService, protected profileService: ProfileService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "articles";
    }

    getDataKeys() {
        return {
            singular: 'article',
            plural: 'articles'
        };
    }


    createInProfile(profile: noosfero.Profile, article: noosfero.Article): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        return this.create(article, profile);
    }


    getAsCollectionChildrenOf<C>(rootElement: noosfero.Environment | noosfero.Article | noosfero.Profile, path: string, queryParams?: any, headers?: any): restangular.ICollectionPromise<C> {
        return rootElement.getList<C>(path, queryParams, headers);
    }

    getAsElementChildrenOf<C>(rootElement: noosfero.Environment | noosfero.Article | noosfero.Profile, path: string, id: number, queryParams?: any, headers?: any) {
        return rootElement.one(path, id).get<C>(queryParams, headers);
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
    getByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.get(<number>profile.id);
        return this.list(profileElement, params);
    }

    getChildren<T>(article: noosfero.Article, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        return this.listSubElements(article, "children", params);
    }



}
