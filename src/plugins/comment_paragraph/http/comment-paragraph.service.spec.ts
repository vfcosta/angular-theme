import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from '@angular/http';
import * as helpers from '../../../spec/helpers';
import {CommentParagraphService} from './comment-paragraph.service';

describe("Services", () => {
    describe("Comment Paragraph Service", () => {
        let mocks = helpers.getMocks();
        let service: CommentParagraphService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    ArticleService, CommentParagraphService, ProfileService, EnvironmentService,
                    { provide: ArticleService, useValue: mocks.articleService},
                    { provide: ProfileService, useValue: mocks.profileService},
                    { provide: EnvironmentService, useValue: mocks.environmentService},
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(CommentParagraphService);
        }));

        describe("Succesfull requests", () => {
            xit("should return paragraph comments by article", () => {
                let articleId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/articles/${articleId}/comment_paragraph_plugin/comments?without_reply=true`,
                    { comments: [{ body: "comment1" }] }, {}, 200);
                service.getByArticle(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
                    expect(result.data).toEqual(<noosfero.Comment[]>[{ body: "comment1" }]);
                });
            });

            // it("should create a paragraph comment", (done) => {
            //     let articleId = 1;
            //     $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/comments`).respond(200, { comment: { body: "comment1" } });
            //     commentParagraphService.createInArticle(<noosfero.Article>{ id: articleId }, <noosfero.Comment>{ body: "comment1" }).then((result: noosfero.RestResult<noosfero.Comment>) => {
            //         expect(result.data).toEqual({ body: "comment1" });
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("activate paragraph comments for an article", (done) => {
            //     let articleId = 1;
            //     $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/activate`).respond(200, { article: { title: "article1" } });
            //     commentParagraphService.activateCommentParagraph(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Article>) => {
            //         expect(result.data).toEqual({ title: "article1" });
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("deactivate paragraph comments for an article", (done) => {
            //     let articleId = 1;
            //     $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/deactivate`).respond(200, { article: { title: "article1" } });
            //     commentParagraphService.deactivateCommentParagraph(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Article>) => {
            //         expect(result.data).toEqual({ title: "article1" });
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("return counts for paragraph comments", (done) => {
            //     let articleId = 1;
            //     $httpBackend.expectGET(`/api/v1/articles/${articleId}/comment_paragraph_plugin/comments/count`).respond(200, { '1': 5, '2': 6 });
            //     commentParagraphService.commentParagraphCount(<noosfero.Article>{ id: articleId }, '1').then((count: number) => {
            //         expect(count).toEqual(5);
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("reset promise when comment paragraph counts fails", (done) => {
            //     let articleId = 1;
            //     commentParagraphService['articleService'] = jasmine.createSpyObj("articleService", ["getElement"]);
            //     commentParagraphService['articleService'].getElement = jasmine.createSpy("getElement").and.returnValue(
            //         {
            //             customGET: (path: string) => {
            //                 return Promise.reject({});
            //             }
            //         }
            //     );
            //     commentParagraphService.commentParagraphCount(<noosfero.Article>{ id: articleId }, '1').catch(() => {
            //         expect(commentParagraphService['commentParagraphCountsPromise']).toBeNull();
            //         done();
            //     });
            // });
        });
    });
});
