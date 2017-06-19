import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { ProfileService } from './profile.service';
import { ArticleService } from './article.service';
import { BrowserModule } from '@angular/platform-browser';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import {CommentService} from "./comment.service";
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Comment Service", () => {
        let $httpBackend: ng.IHttpBackendService;
        let commentService: CommentService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    ProfileService, EnvironmentService, ArticleService, CommentService,
                    { provide: "profileService", useValue: mocks.profileService},
                    { provide: "environmentService", useValue: mocks.environmentService},
                    { provide: "articleService", useValue: mocks.articleService},
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            commentService = TestBed.get(CommentService);
        }));

        describe("Succesfull requests", () => {
            // TODO: All ngx-restangular tests are broken.
            //       Wait for a reponse about it on this issue: https://github.com/2muchcoffeecom/ngx-restangular/issues/80
            xit("should return comments by article", () => {
                let articleId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/${articleId}/comments?without_reply=true`,
                    {comments: [{ name: "comment1" }]}, {'total': 1}, 200);
                commentService.getByArticle(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
                    console.log("PROMISE");
                    console.log("PROMISE", result);
                    expect(result.data).toEqual([{ name: "comment1" }]);
                });
                // tick();
                // tick();
            });

            xit("should create a comment in an article", (done) => {
                let articleId = 1;
                let comment: noosfero.Comment = <any>{ id: null };
                $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comments`, comment).respond(200, { comment: { id: 2 } });
                commentService.createInArticle(<noosfero.Article>{ id: articleId }, comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
                    expect(result.data).toEqual({ id: 2 });
                    done();
                });
                $httpBackend.flush();
            });

            xit("should remove a comment from an article", (done) => {
                let articleId = 1;
                let comment: noosfero.Comment = <any>{ id: 2 };
                $httpBackend.expectDELETE(`/api/v1/articles/${articleId}/comments/${comment.id}`).respond(200, { comment: { id: 2 } });
                commentService.removeFromArticle(<noosfero.Article>{ id: articleId }, comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
                    expect(result.data).toEqual({ id: 2 });
                    done();
                });
                $httpBackend.flush();
            });
        });
    });
});
