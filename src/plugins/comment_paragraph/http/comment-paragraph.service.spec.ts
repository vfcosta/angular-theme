import {CommentParagraphService} from "./comment-paragraph.service";


describe("Services", () => {

    describe("Comment Paragraph Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let commentParagraphService: CommentParagraphService;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _CommentParagraphService_: CommentParagraphService) => {
            $httpBackend = _$httpBackend_;
            commentParagraphService = _CommentParagraphService_;
        }));


        describe("Succesfull requests", () => {

            it("should return paragraph comments by article", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/comment_paragraph_plugin/comments?without_reply=true`).respond(200, { comments: [{ body: "comment1" }] });
                commentParagraphService.getByArticle(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
                    expect(result.data).toEqual([{ body: "comment1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should create a paragraph comment", (done) => {
                let articleId = 1;
                $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/comments`).respond(200, { comment: { body: "comment1" } });
                commentParagraphService.createInArticle(<noosfero.Article>{ id: articleId }, <noosfero.Comment>{ body: "comment1" }).then((result: noosfero.RestResult<noosfero.Comment>) => {
                    expect(result.data).toEqual({ body: "comment1" });
                    done();
                });
                $httpBackend.flush();
            });

            it("activate paragraph comments for an article", (done) => {
                let articleId = 1;
                $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/activate`).respond(200, { article: { title: "article1" } });
                commentParagraphService.activateCommentParagraph(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Article>) => {
                    expect(result.data).toEqual({ title: "article1" });
                    done();
                });
                $httpBackend.flush();
            });

            it("deactivate paragraph comments for an article", (done) => {
                let articleId = 1;
                $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comment_paragraph_plugin/deactivate`).respond(200, { article: { title: "article1" } });
                commentParagraphService.deactivateCommentParagraph(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Article>) => {
                    expect(result.data).toEqual({ title: "article1" });
                    done();
                });
                $httpBackend.flush();
            });

            it("return counts for paragraph comments", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/comment_paragraph_plugin/comments/count`).respond(200, { '1': 5, '2': 6 });
                commentParagraphService.commentParagraphCount(<noosfero.Article>{ id: articleId }, '1').then((count: number) => {
                    expect(count).toEqual(5);
                    done();
                });
                $httpBackend.flush();
            });

            it("reset promise when comment paragraph counts fails", (done) => {
                let articleId = 1;
                commentParagraphService['articleService'] = jasmine.createSpyObj("articleService", ["getElement"]);
                commentParagraphService['articleService'].getElement = jasmine.createSpy("getElement").and.returnValue(
                    {
                        customGET: (path: string) => {
                            return Promise.reject({});
                        }
                    }
                );
                commentParagraphService.commentParagraphCount(<noosfero.Article>{ id: articleId }, '1').catch(() => {
                    expect(commentParagraphService['commentParagraphCountsPromise']).toBeNull();
                    done();
                });
            });
        });
    });
});
