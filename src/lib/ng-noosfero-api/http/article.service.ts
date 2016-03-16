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
        let profileElement = this.profileService.get(<number>profile.id);
        (<any>profileElement).id = profile.id;
        debugger;
        return this.create(article, <noosfero.RestModel>profileElement);
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

    getOneByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.get(<number>profile.id);
        return this.get(profile.id, params);
    }

    getChildren<T>(article: noosfero.Article, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let articleElement = this.getElement(article.id);
        articleElement.id = article.id;
        return this.listSubElements(<noosfero.Article>articleElement, "children", params);
    }



}
