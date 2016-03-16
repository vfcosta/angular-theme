import {Article} from "../../../app/models/interfaces";
import {ArticleService} from "./article.service";


describe("Services", () => {

    describe("Article Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let articleService: ArticleService;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _ArticleService_: ArticleService) => {
            $httpBackend = _$httpBackend_;
            articleService = _ArticleService_;
        }));


        describe("Succesfull requests", () => {

            it("should return article children", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/children`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getChildren(articleId).then((response: restangular.IResponse) => {
                    expect(response.data.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get articles by profile", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/articles`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getByProfile(profileId).then((response: restangular.IResponse) => {
                    expect(response.data.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get articles by profile with additional filters", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/articles?path=test`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getByProfile(profileId, { path: 'test' }).then((response: restangular.IResponse) => {
                    expect(response.data.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get article children with additional filters", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/children?path=test`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getChildren(articleId, { path: 'test' }).then((response: restangular.IResponse) => {
                    expect(response.data.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should create an article in a profile", (done) => {
                let profileId = 1;
                let article: Article = { id: null };
                $httpBackend.expectPOST(`/api/v1/profiles/${profileId}/articles`, { article: article }).respond(200, { articles: [{ id: 2 }] });
                articleService.create(profileId, article).then((response: restangular.IResponse) => {
                    expect(response.data.articles).toEqual([{ id: 2 }]);
                    done();
                });
                $httpBackend.flush();
            });
        });


    });
});
