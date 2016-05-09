import {AllowCommentComponent} from "./allow-comment.component";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import {Provider} from 'ng-forward';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

let htmlTemplate = '<comment-paragraph-plugin-allow-comment [content]="ctrl.content" [paragraph-uuid]="ctrl.paragraphUuid" [article]="ctrl.article"></comment-paragraph-plugin-allow-comment>';

describe("Components", () => {
    describe("Allow Comment Component", () => {

        let serviceMock = {
            commentParagraphCount: () => {
                return Promise.resolve(5);
            }
        };
        let functionToggleCommentParagraph: Function;
        let eventServiceMock = {
            // toggleCommentParagraph
            subscribeToggleCommentParagraph: (fn: Function) => {
                functionToggleCommentParagraph = fn;
            }
        };

        let providers = [
            new Provider('CommentParagraphService', { useValue: serviceMock }),
            new Provider('CommentParagraphEventService', { useValue: eventServiceMock })
        ];
        let helper: ComponentTestHelper<AllowCommentComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [AllowCommentComponent],
                providers: providers,
                properties: {
                    content: "",
                    paragraphUuid: "uuid",
                    article: {
                        setting: {
                            comment_paragraph_plugin_activate: true
                        }
                    }
                }
            });
            helper = new ComponentTestHelper<AllowCommentComponent>(cls, done);
        });

        it('update comments count', () => {
            expect(helper.component.commentsCount).toEqual(5);
        });

        it('display paragraph content', () => {
            expect(helper.all(".paragraph .paragraph-content").length).toEqual(1);
        });

        it('display button to side comments', () => {
            expect(helper.all(".paragraph .actions a").length).toEqual(1);
        });

        it('set display to true when click in show paragraph', () => {
            helper.component.showParagraphComments();
            expect(helper.component.display).toBeTruthy();
        });

        it('set display to false when click in hide paragraph', () => {
            helper.component.hideParagraphComments();
            expect(helper.component.display).toBeFalsy();
        });

        it('update article when receive a toogle paragraph event', () => {
            functionToggleCommentParagraph({ id: 2 });
            expect(helper.component.article.id).toEqual(2);
        });
    });
});