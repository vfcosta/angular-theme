import {ArticleService} from "./article.service";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Article Service", () => {
        let service: ArticleService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    ArticleService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(ArticleService);
        }));

        xdescribe("Succesfull requests", () => {
            it("should remove article", () => {
                let articleId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/${articleId}`, { success: "true" }, {}, 200);
                service.remove(<noosfero.Article>{ id: articleId });
            });

            it("should return article children", () => {
                let articleId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/${articleId}/children`, { articles: [{ name: "article1" }] }, {}, 200);
                service.getChildren(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
                    expect(result.data).toEqual([{ name: "article1" }]);
                });
            });

            it("should get articles by profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/articles`, { articles: [{ name: "article1" }] }, {}, 200);
                service.getByProfile(<noosfero.Profile>{ id: profileId }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
                    expect(result.data).toEqual([{ name: "article1" }]);
                });
            });

            it("should get articles by profile with additional filters", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/articles?path=test`, { articles: [{ name: "article1" }] }, {}, 200);
                service.getByProfile(<noosfero.Profile>{ id: profileId }, { path: 'test' }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
                    expect(result.data).toEqual([{ name: "article1" }]);
                });
            });

            it("should get article children with additional filters", () => {
                let articleId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/${articleId}/children?path=test`, { articles: [{ name: "article1" }] }, {}, 200);
                service.getChildren(<noosfero.Article>{ id: articleId }, { path: 'test' }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
                    expect(result.data).toEqual([{ name: "article1" }]);
                });
            });

            it("should create an article in a profile", () => {
                let profileId = 1;
                let article: noosfero.Article = <any>{ id: null };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/articles`, { article: { id: 2 }}, {}, 200);
                service.createInProfile(<noosfero.Profile>{ id: profileId }, article).then((result: noosfero.RestResult<noosfero.Article>) => {
                    expect(result.data).toEqual({ id: 2 });
                });
            });

            it("should search for articles in environment", () => {
                let profileId = 1;
                let article: noosfero.Article = <any>{ id: null };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/search/article?query=query`, { articles: [{ id: 2 }] }, {}, 200);
                service.search({ query: 'query' }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
                    expect(result.data).toEqual([{ id: 2 }]);
                });
            });

            it("should update an article", () => {
                let article: noosfero.Article = <any>{ id: 10, name: "article name" };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/10`, { article: { id: 2 }}, {}, 200);
                service.updateArticle(article).then((result: noosfero.RestResult<noosfero.Article>) => {
                    expect(result.data).toEqual({ id: 2 });
                });
            });
        });
    });
});
