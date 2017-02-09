import { Injectable, Inject, EventEmitter } from "ng-forward";
import {RestangularService} from "./restangular_service";
import {ProfileService} from "./profile.service";
import {NoosferoRootScope} from "./../../../app/shared/models/interfaces";
import { EnvironmentService } from './environment.service';

@Injectable()
@Inject("Restangular", "$q", "$log", ProfileService, "$document", EnvironmentService)
export class ArticleService extends RestangularService<noosfero.Article> {
    environment: noosfero.Environment;

    constructor(
        Restangular: restangular.IService,
        $q: ng.IQService,
        $log: ng.ILogService,
        protected profileService: ProfileService,
        private $document: ng.IDocumentService,
        private environmentService: EnvironmentService
    ) {
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

    // removeArticle(article: noosfero.Article) {
    //     // let restRequest: ng.IPromise<noosfero.RestResult<noosfero.Article>> = this.remove(article);
    //     // let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
    //     // restRequest.then((result: any) => {
    //     //     this.notifyArticleRemovedListeners(article);
    //     // }).catch(this.getHandleErrorFunction(deferred));
    //     // return deferred.promise;
    // }

    /**
     * Notify listeners that this article has been removed
     */
    // private notifyArticleRemovedListeners(article: noosfero.Article) {
    //     this.modelRemovedEventEmitter.next(article);
    // }
    setCurrent(article: noosfero.Article) {
        super.setCurrent(article);
        this.environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
        this.$document.prop('title', this.environment.name + ' - ' + article.title);
    }

    updateArticle(article: noosfero.Article) {
        let headers = {
            'Content-Type': 'application/json'
        };
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
        // TODO dynamically copy the selected attributes to update
        let attributesToUpdate: any = {
            article: {
                name: article.name, body: article.body, published: article.published,
                start_date: article['start_date'], end_date: article['end_date']
            }
        };
        let restRequest: ng.IPromise<noosfero.RestResult<noosfero.Article>> = this.getElement(article.id).customPOST(attributesToUpdate, null, null, headers);
        restRequest.then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

    createInProfile(profile: noosfero.Profile, article: noosfero.Article): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.getProfileElement(<number>profile.id);
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
        let profileElement = this.profileService.getProfileElement(<number>profile.id);
        return this.list(profileElement, params);
    }

    getArticleByProfileAndPath(profile: noosfero.Profile, path: string): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article>>();
        let profileElement = this.profileService.getProfileElement(<number>profile.id);

        let restRequest: ng.IPromise<any>;

        let params = { path: path };

        restRequest = profileElement.customGET(this.getResourcePath(), params);


        restRequest
            .then(this.getHandleSuccessFunction(deferred))
            .catch(this.getHandleErrorFunction(deferred));


        return deferred.promise;
    }

    getOneByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.getProfileElement(<number>profile.id);
        return this.getSub(profileElement, params);
    }

    getChildren<T>(article: noosfero.Article, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let articleElement = this.getElement(article.id);
        articleElement.id = article.id;
        return this.listSubElements(<noosfero.Article>articleElement, "children", params);
    }

    search(params: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Article[]>>();
        let restRequest = this.restangularService.all("search").customGET('article', params);
        restRequest.then(this.getHandleSuccessFunction(deferred)).catch(this.getHandleErrorFunction(deferred));
        return deferred.promise;
    }

}
