import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";

import {CommentComponent} from './comment.component';
import {PostCommentComponent} from './post-comment/post-comment.component';

const htmlTemplate: string = '<noosfero-comment [article]="ctrl.article" [comment]="ctrl.comment"></noosfero-comment>';

describe("Components", () => {
    describe("Comment Component", () => {

        beforeEach(angular.mock.module("templates"));

        function createComponent() {
            let providers = helpers.provideFilters("translateFilter");

            @Component({ selector: 'test-container-component', directives: [CommentComponent], template: htmlTemplate, providers: providers })
            class ContainerComponent {
                article = { id: 1 };
                comment = { title: "title", body: "body" };
            }
            return helpers.createComponentFromClass(ContainerComponent);
        }

        it("render a comment", done => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll(".comment").length).toEqual(1);
                done();
            });
        });

        it("not render a post comment tag in the beginning", done => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-post-comment").length).toEqual(0);
                done();
            });
        });

        it("set show reply to true when click reply", done => {
            createComponent().then(fixture => {
                let component: CommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.reply();
                expect(component.showReply).toBeTruthy(1);
                done();
            });
        });

        it("close form when receive a reply", done => {
            createComponent().then(fixture => {
                let component = fixture.debugElement.componentViewChildren[0];
                component.componentInstance.showReply = true;
                fixture.debugElement.getLocal("$rootScope").$broadcast(PostCommentComponent.EVENT_COMMENT_RECEIVED, {});
                expect(component.componentInstance.showReply).toEqual(false);
                done();
            });
        });
    });
});
