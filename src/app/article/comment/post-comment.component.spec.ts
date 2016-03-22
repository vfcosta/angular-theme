import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";

import {PostCommentComponent} from './post-comment.component';

const htmlTemplate: string = '<noosfero-post-comment [article]="ctrl.article" [reply-of]="ctrl.comment"></noosfero-post-comment>';

describe("Components", () => {
    describe("Post Comment Component", () => {

        beforeEach(angular.mock.module("templates"));

        let commentService = jasmine.createSpyObj("commentService", ["createInArticle"]);
        let providers = [
            new Provider('CommentService', { useValue: commentService }),
            new Provider('NotificationService', { useValue: helpers.mocks.notificationService })
        ].concat(helpers.provideFilters("translateFilter"));

        @Component({ selector: 'test-container-component', directives: [PostCommentComponent], template: htmlTemplate, providers: providers })
        class ContainerComponent {
            article = { id: 1 };
            comment = { id: 2 };
        }

        it("render the post comment form", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("form").length).toEqual(1);
                done();
            });
        });

        it("emit an event when create comment", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: PostCommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                commentService.createInArticle = jasmine.createSpy("createInArticle").and.returnValue(helpers.mocks.promiseResultTemplate({ data: {} }));
                component["$rootScope"].$emit = jasmine.createSpy("$emit");
                component.save();
                expect(component["$rootScope"].$emit).toHaveBeenCalledWith(PostCommentComponent.EVENT_COMMENT_RECEIVED, jasmine.any(Object));
                done();
            });
        });

        it("notify success when create comment", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: PostCommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                commentService.createInArticle = jasmine.createSpy("createInArticle").and.returnValue(helpers.mocks.promiseResultTemplate({ data: {} }));
                component["notificationService"].success = jasmine.createSpy("success");
                component.save();
                expect(component["notificationService"].success).toHaveBeenCalled();
                done();
            });
        });

        it("set the reply id when reply to a comment", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: PostCommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.comment = <any>{ reply_of_id: null };
                component.replyOf = <any>{ id: 10 };
                component.save();
                expect(component.comment.reply_of_id).toEqual(component.replyOf.id);
                done();
            });
        });

    });
});
