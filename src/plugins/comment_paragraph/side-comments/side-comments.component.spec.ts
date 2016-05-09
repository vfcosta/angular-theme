import {SideCommentsComponent} from "./side-comments.component";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import {Provider} from 'ng-forward';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

let htmlTemplate = '<comment-paragraph-side-comments [article]="ctrl.article" [paragraph-uuid]="ctrl.paragraphUuid"></comment-paragraph-side-comments>';

describe("Components", () => {
    describe("Side Comments Component", () => {

        let serviceMock = jasmine.createSpyObj("CommentParagraphService", ["getByArticle"]);
        serviceMock.getByArticle = jasmine.createSpy("getByArticle").and.returnValue(Promise.resolve({ data: {} }));

        let commentServiceMock = {};
        let postCommentEventService = jasmine.createSpyObj("postCommentEventService", ["emit", "subscribe"]);
        postCommentEventService.subscribe = jasmine.createSpy("subscribe");

        let providers = [
            new Provider('CommentParagraphService', { useValue: serviceMock }),
            new Provider('CommentService', { useValue: commentServiceMock }),
            new Provider('PostCommentEventService', { useValue: postCommentEventService })
        ];
        let helper: ComponentTestHelper<SideCommentsComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [SideCommentsComponent],
                providers: providers,
                properties: {
                    paragraphUuid: "uuid",
                    article: {}
                }
            });
            helper = new ComponentTestHelper<SideCommentsComponent>(cls, done);
        });

        it('call service to load paragraph comments', () => {
            helper.component.loadComments();
            expect(serviceMock.getByArticle).toHaveBeenCalled();
        });

        it('set paragraph uuid in new comment object', () => {
            expect(helper.component.newComment['paragraph_uuid']).toEqual('uuid');
        });
    });
});
