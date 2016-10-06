import { Provider, provide, Component } from 'ng-forward';
import * as helpers from "../../../../spec/helpers";
import { PostCommentComponent } from './post-comment.component';

const htmlTemplate: string = '<noosfero-post-comment [article]="ctrl.article" [reply-of]="ctrl.comment"></noosfero-post-comment>';

describe("Components", () => {
    describe("Post Comment Component", () => {

        let properties: any;

        beforeEach(angular.mock.module("templates"));

        beforeEach(() => {
            properties = { article: { id: 1, accept_comments: true } };
        });

        let commentService = jasmine.createSpyObj("commentService", ["createInArticle"]);
        let user = {};
        let providers = [
            new Provider('CommentService', { useValue: commentService }),
            new Provider('NotificationService', { useValue: helpers.mocks.notificationService }),
            new Provider('SessionService', { useValue: helpers.mocks.sessionWithCurrentUser(user) })
        ].concat(helpers.provideFilters("translateFilter"));

        @Component({ selector: 'test-container-component', directives: [PostCommentComponent], template: htmlTemplate, providers: providers })
        class ContainerComponent {
            article = properties['article'];
            comment = { id: 2 };
        }

        it("render the post comment form", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("form").length).toEqual(1);
                done();
            });
        });

        it("not render the post comment form when article doesn't accept comments", done => {
            properties['article'].accept_comments = false;
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("form").length).toEqual(0);
                done();
            });
        });

        it("emit an event when create comment", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: PostCommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component.commentSaved.next = jasmine.createSpy("next");
                commentService.createInArticle = jasmine.createSpy("createInArticle").and.returnValue(helpers.mocks.promiseResultTemplate({ data: {} }));
                component.save();
                expect(component.commentSaved.next).toHaveBeenCalled();
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
                component.parent = <any>{ id: 10 };
                component.save();
                expect(component.comment.reply_of_id).toEqual(component.parent.id);
                done();
            });
        });

        it("render alert when not logged in", done => {
            helpers.createComponentFromClass(ContainerComponent).then(fixture => {
                let component: PostCommentComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
                component['currentUser'] = null;
                fixture.detectChanges();
                expect(fixture.debugElement.queryAll("form .post-comment-logged-in").length).toEqual(0);
                expect(fixture.debugElement.queryAll("form .post-comment-not-logged-in").length).toEqual(1);
                done();
            });
        });
    });
});
