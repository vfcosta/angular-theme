import { DOCUMENT } from '@angular/platform-browser';
import { Restangular } from 'ngx-restangular';
import { Injectable, Inject, EventEmitter } from "@angular/core";
import { RestangularService } from "./restangular_service";
import { ProfileService } from "./profile.service";
import { EnvironmentService } from './environment.service';

declare var _: any;

@Injectable()
export class ArticleService extends RestangularService<noosfero.Article> {
    environment: noosfero.Environment;

    constructor(protected restangular: Restangular,
        protected profileService: ProfileService,
        @Inject(DOCUMENT) private document: any,
        private environmentService: EnvironmentService
    ) {
        super(restangular);
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

    /**
     * Notify listeners that this article has been removed
     */
    setCurrent(article: noosfero.Article) {
        super.setCurrent(article);
        this.environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
            angular.element(this.document).prop('title', this.environment.name + ' - ' + article.title);
        });
    }

    updateArticle(article: noosfero.Article) {
        let headers = {
            'Content-Type': 'application/json'
        };
        let attributesToUpdate: any = {
            article: Object.assign({}, _.omitBy(_.pick(article, ['name', 'body', 'published', 'start_date', 'end_date']), _.isNull))
        };
        let restRequest = this.getElement(article.id).customPOST(attributesToUpdate, null, null, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
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

    getByProfile<T>(profile: noosfero.Profile, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let profileElement = this.profileService.getProfileElement(<number>profile.id);
        return this.list(profileElement, params);
    }

    getArticleByProfileAndPath(profile: noosfero.Profile, path: string): ng.IPromise<noosfero.RestResult<noosfero.Article>> {
        let profileElement = this.profileService.getProfileElement(<number>profile.id);
        let params = { path: path };
        let restRequest = profileElement.customGET(this.getResourcePath(), params);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    getChildren<T>(article: noosfero.Article, params?: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let articleElement = this.getElement(article.id);
        articleElement.id = article.id;
        return this.listSubElements(<noosfero.Article>articleElement, "children", params);
    }

    search(params: any): ng.IPromise<noosfero.RestResult<noosfero.Article[]>> {
        let restRequest = this.restangular.all("search").customGET('article', params);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }
}
