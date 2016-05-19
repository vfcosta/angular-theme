import {Provider, provide, Component} from 'ng-forward';
import * as helpers from "../../../spec/helpers";
import {CommentComponent} from './comment.component';

const htmlTemplate: string = '<noosfero-comment [article]="ctrl.article" [comment]="ctrl.comment"></noosfero-comment>';

describe("Components", () => {
    describe("Comment Component", () => {

        let properties: any;
        let notificationService = helpers.mocks.notificationService;
        let commentService = jasmine.createSpyObj("commentService", ["removeFromArticle"]);

        beforeEach(angular.mock.module("templates"));
        beforeEach(() => {
            properties = {
                article: { id: 1, accept_comments: true },
                comment: { title: "title", body: "body" }
            };
        });

        function createComponent() {
            let providers = [
                helpers.createProviderToValue('NotificationService', notificationService),
                helpers.createProviderToValue("CommentService", commentService)
            ].concat(helpers.provideFilters("translateFilter"));

            @Component({ selector: 'test-container-component', directives: [CommentComponent], template: htmlTemplate, providers: providers })
            class ContainerComponent {
                article = properties['article'];
                comment = properties['comment'];
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
                expect(component.showReply()).toBeTruthy("Reply was expected to be true");
                done();
            });
        });

        it("show reply relies on current comment __showReply attribute", done => {
            createComponent().then(fixture => {
                let component = fixture.debugElement.componentViewChildren[0];
                component.componentInstance.comment.__showReply = false;
                expect(component.componentInstance.showReply()).toEqual(false);
                done();
            });
        });

        it("display reply button", done => {
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll(".comment .actions .reply").length).toEqual(1);
                done();
            });
        });

        it("not display reply button when accept_comments is false", done => {
            properties['article']['accept_comments'] = false;
            createComponent().then(fixture => {
                expect(fixture.debugElement.queryAll(".comment .actions .reply").length).toEqual(0);
                done();
            });
        });

        it("call comment service to remove comment", done => {
            notificationService.confirmation = (params: any, func: Function) => { func(); };
            commentService.removeFromArticle = jasmine.createSpy("removeFromArticle").and.returnValue(Promise.resolve());
            createComponent().then(fixture => {
                let component = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.remove();
                expect(commentService.removeFromArticle).toHaveBeenCalled();
                done();
            });
        });
    });
});
