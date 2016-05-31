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

        let properties = { article: { id: 1 }, parent: <any>null };
        function createComponent() {
            let providers = [
                helpers.createProviderToValue('CommentService', commentService),
                helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
                helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({}))
            ].concat(helpers.provideFilters("translateFilter"));

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
            properties.parent = { id: 3 };
            createComponent().then(fixture => {
                (<CommentsComponent>fixture.debugElement.componentViewChildren[0].componentInstance).commentAdded(<noosfero.Comment>{ id: 1, reply_of: { id: 3 } });
                fixture.detectChanges();
                expect(fixture.debugElement.queryAll("noosfero-comment").length).toEqual(3);
                done();
            });
        });

        it("load comments for next page", done => {
            createComponent().then(fixture => {
                let headers = jasmine.createSpy("headers").and.returnValue(3);
                commentService.getByArticle = jasmine.createSpy("getByArticle")
                    .and.returnValue(helpers.mocks.promiseResultTemplate({ data: { id: 4 }, headers: headers }));
                let component: CommentsComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.loadNextPage();
                expect(component['page']).toEqual(3);
                expect(component.comments.length).toEqual(3);
                expect(component['total']).toEqual(3);
                done();
            });
        });

        it("not display more when there is no more comments to load", done => {
            createComponent().then(fixture => {
                let component: CommentsComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component['total'] = 0;
                component.parent = null;
                expect(component.displayMore()).toBeFalsy();
                done();
            });
        });

        it("remove comment when calling commentRemoved", done => {
            createComponent().then(fixture => {
                let component: CommentsComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                let comment = { id: 1 };
                component.comments = <any>[comment];
                component.commentRemoved(<any>comment);
                expect(component.comments).toEqual([]);
                done();
            });
        });

        it("do nothing when call commentRemoved with a comment that doesn't belongs to the comments list", done => {
            createComponent().then(fixture => {
                let component: CommentsComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                let comment = { id: 1 };
                component.comments = <any>[comment];
                component.commentRemoved(<any>{ id: 2 });
                expect(component.comments).toEqual([comment]);
                done();
            });
        });
    });
});
