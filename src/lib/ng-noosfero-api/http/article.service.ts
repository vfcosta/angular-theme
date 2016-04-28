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

    updateArticle(article: noosfero.Article) {
        let headers = {
            'Content-Type': 'application/json'
        };
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
        let attributesToUpdate: any = { article: { name: article.name, body: article.body } };
        let restRequest: ng.IPromise<noosfero.RestResult<noosfero.Article>> = this.getElement(article.id).customPOST(attributesToUpdate, null, null, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

    createInProfile(profile: noosfero.Profile, article: noosfero.Article): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.get(<number>profile.id);
        (<any>profileElement).id = profile.id;
        let headers = {
            'Content-Type': 'application/json'
        };
        return this.create(article, <noosfero.RestModel>profileElement, null, headers);
    }

    createInParent(parentId: number, article: noosfero.Article): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let headers = {
            'Content-Type': 'application/json'
        };

        let parent = this.getElement(parentId);
        return this.create(article, parent, null, headers, true, "children");
    }

    getAsCollectionChildrenOf<C>(rootElement: noosfero.Environment | noosfero.Article | noosfero.Profile, path: string, queryParams?: any, headers?: any): restangular.ICollectionPromise<C> {
        return rootElement.getList<C>(path, queryParams, headers);
    }

    getAsElementChildrenOf<C>(rootElement: noosfero.Environment | noosfero.Article | noosfero.Profile, path: string, id: number, queryParams?: any, headers?: any) {
        return rootElement.one(path, id).get<C>(queryParams, headers);
    }

    getByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let profileElement = this.profileService.get(<number>profile.id);
        return this.list(profileElement, params);
    }

    getArticleByProfileAndPath(profile: noosfero.Profile, path: string): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
        let profileElement = this.profileService.get(<number>profile.id);

        let restRequest: ng.IPromise<any>;

        let params = { path: path };

        restRequest = profileElement.customGET(this.getResourcePath(), params);


        restRequest
            .then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));


        return deferred.promise;
    }

    getOneByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.get(<number>profile.id);
        return this.getSub(profileElement, params);
    }

    getChildren<T>(article: noosfero.Article, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let articleElement = this.getElement(article.id);
        articleElement.id = article.id;
        return this.listSubElements(<noosfero.Article>articleElement, "children", params);
    }


}
