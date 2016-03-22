import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";

import {CommentsComponent} from './comments.component';
import {PostCommentComponent} from "./post-comment.component";

const htmlTemplate: string = '<noosfero-comments [article]="ctrl.article"></noosfero-comments>';

describe("Components", () => {
    describe("Comments Component", () => {

        beforeEach(angular.mock.module("templates"));

        let commentService = jasmine.createSpyObj("commentService", ["getByArticle"]);

        let comments = [{ id: 2 }, { id: 3 }];
        commentService.getByArticle = jasmine.createSpy("getByArticle")
            .and.returnValue(helpers.mocks.promiseResultTemplate({ data: comments }));

        let providers = [
            new Provider('CommentService', { useValue: commentService }),
            new Provider('NotificationService', { useValue: helpers.mocks.notificationService })
        ].concat(helpers.provideFilters("translateFilter"));

        @Component({ selector: 'test-container-component', directives: [CommentsComponent], template: htmlTemplate, providers: providers })
        class ContainerComponent {
            article = { id: 1 };
        }

        it("render comments associated to an article", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-comment").length).toEqual(2);
                done();
            });
        });

        it("render a post comment tag", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-post-comment").length).toEqual(1);
                done();
            });
        });

        it("update comments list when receive an event", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                fixture.debugElement.getLocal("$rootScope").$emit(PostCommentComponent.EVENT_COMMENT_RECEIVED, { id: 1 });
                fixture.debugElement.getLocal("$rootScope").$apply();
                expect(fixture.debugElement.queryAll("noosfero-comment").length).toEqual(3);
                done();
            });
        });

    });
});
