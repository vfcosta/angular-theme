import {CommentService} from "./comment.service";


describe("Services", () => {

    describe("Comment Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let commentService: CommentService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _CommentService_: CommentService) => {
            $httpBackend = _$httpBackend_;
            commentService = _CommentService_;
        }));


        describe("Succesfull requests", () => {

            it("should return comments by article", (done) => {
                let articleId = 1;
                $httpBackend.expectGET(`/api/v1/articles/${articleId}/comments?without_reply=true`).respond(200, { comments: [{ name: "comment1" }] });
                commentService.getByArticle(<noosfero.Article>{ id: articleId }).then((result: noosfero.RestResult<noosfero.Comment[]>) => {
                    expect(result.data).toEqual([{ name: "comment1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should create a comment in an article", (done) => {
                let articleId = 1;
                let comment: noosfero.Comment = <any>{ id: null };
                $httpBackend.expectPOST(`/api/v1/articles/${articleId}/comments`, comment).respond(200, { comment: { id: 2 } });
                commentService.createInArticle(<noosfero.Article>{ id: articleId }, comment).then((result: noosfero.RestResult<noosfero.Comment>) => {
                    expect(result.data).toEqual({ id: 2 });
                    done();
                });
                $httpBackend.flush();
            });

            it("should remove a comment from an article", (done) => {
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
