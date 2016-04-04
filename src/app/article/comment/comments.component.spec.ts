import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";

import {CommentsComponent} from './comments.component';
import {PostCommentComponent} from "./post-comment/post-comment.component";

const htmlTemplate: string = '<noosfero-comments [article]="ctrl.article"></noosfero-comments>';

describe("Components", () => {
    describe("Comments Component", () => {

        beforeEach(angular.mock.module("templates"));

        let commentService = jasmine.createSpyObj("commentService", ["getByArticle"]);

        let comments = [{ id: 2 }, { id: 3 }];
        commentService.getByArticle = jasmine.createSpy("getByArticle")
            .and.returnValue(helpers.mocks.promiseResultTemplate({ data: comments }));

        let providers = [
            helpers.createProviderToValue('CommentService', commentService),
            helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
            helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({}))
        ].concat(helpers.provideFilters("translateFilter"));

        let properties = { article: { id: 1 }, parent: <any>null };
        function createComponent() {
            return helpers.quickCreateComponent({
                providers: providers,
                directives: [CommentsComponent],
                template: htmlTemplate,
                properties: properties
            });
        }


        it("render comments associated to an article", done => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-comment").length).toEqual(2);
                done();
            });
        });

        it("render a post comment tag", done => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-post-comment").length).toEqual(1);
                done();
            });
        });

        it("update comments list when receive an reply", done => {
            properties.parent = { id: 2 };
            createComponent().then(fixture => {
                fixture.debugElement.getLocal("$rootScope").$emit(PostCommentComponent.EVENT_COMMENT_RECEIVED, { id: 1, reply_of: properties.parent });
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll("noosfero-comment").length).toEqual(3);
                done();
            });
        });
    });
});
