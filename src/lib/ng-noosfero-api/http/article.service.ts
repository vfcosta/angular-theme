import { Title } from '@angular/platform-browser';
import { Restangular } from 'ngx-restangular';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { RestangularService } from './restangular_service';
import { ProfileService } from './profile.service';
import { EnvironmentService } from './environment.service';
import * as _ from "lodash";

@Injectable()
export class ArticleService extends RestangularService<noosfero.Article> {
    environment: noosfero.Environment;

    constructor(protected restangular: Restangular,
        protected profileService: ProfileService,
        private titleService: Title,
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
            this.titleService.setTitle(this.environment.name + ' - ' + article.title);
        });
    }

    updateArticle(article: noosfero.Article) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const attributesToUpdate: any = {
            article: Object.assign({}, _.omitBy(_.pick(article, ['name', 'body', 'published', 'start_date', 'end_date']), _.isNull))
        };
        const restRequest = this.getElement(article.id).customPOST(attributesToUpdate, null, null, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    createInProfile(profile: noosfero.Profile, article: noosfero.Article): Promise<noosfero.RestResult<noosfero.Article>> {
        const profileElement = this.profileService.getProfileElement(<number>profile.id);
        (<any>profileElement).id = profile.id;
        const headers = {
            'Content-Type': 'application/json'
        };
        return this.create(article, <noosfero.RestModel>profileElement, null, headers);
    }

    createInParent(parentId: number, article: noosfero.Article): Promise<noosfero.RestResult<noosfero.Article>> {
        const headers = {
            'Content-Type': 'application/json'
        };

        const parent = this.getElement(parentId);
        return this.create(article, parent, null, headers, true, "children");
    }

    getByProfile<T>(profile: noosfero.Profile, params?: any): Promise<noosfero.RestResult<noosfero.Article[]>> {
        const profileElement = this.profileService.getProfileElement(<number>profile.id);
        return this.list(profileElement, params);
    }

    getArticleByProfileAndPath(profile: noosfero.Profile, path: string): Promise<noosfero.RestResult<noosfero.Article>> {
        const profileElement = this.profileService.getProfileElement(<number>profile.id);
        const params = { path: path };
        const restRequest = profileElement.customGET(this.getResourcePath(), params);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    getChildren<T>(article: noosfero.Article, params?: any): Promise<noosfero.RestResult<noosfero.Article[]>> {
        const articleElement = this.getElement(article.id);
        articleElement.id = article.id;
        return this.listSubElements(<noosfero.Article>articleElement, "children", params);
    }

    search(params: any): Promise<noosfero.RestResult<noosfero.Article[]>> {
        const restRequest = this.restangular.all("search").customGET('article', params);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }
}
