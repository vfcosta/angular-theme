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
                articleService.getChildren<noosfero.ArticlesResult>(articleId).then((result: noosfero.ArticlesResult) => {
                    expect(result.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get articles by profile", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/articles`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getByProfile<noosfero.ArticlesResult>(profileId).then((result: noosfero.ArticlesResult) => {
                    expect(result.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get articles by profile with additional filters", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/articles?path=test`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getByProfile<noosfero.ArticlesResult>(profileId, { path: 'test' }).then((result: noosfero.ArticlesResult) => {
                    expect(result.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should get article children with additional filters", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/children?path=test`).respond(200, { articles: [{ name: "article1" }] });
                articleService.getChildren<noosfero.ArticlesResult>(articleId, { path: 'test' }).then((result: noosfero.ArticlesResult) => {
                    expect(result.articles).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should create an article in a profile", (done) => {
                let profileId = 1;
                let article: noosfero.Article = <any>{ id: null};
                $httpBackend.expectPOST(`/api/v1/profiles/${profileId}/articles`, { article: article }).respond(200, {  id: 2  });
                articleService.create(profileId, article).then((result: noosfero.Article) => {
                    expect(article).toEqual({ id: 2 });
                    done();
                });
                $httpBackend.flush();
            });
        });


    });
});
