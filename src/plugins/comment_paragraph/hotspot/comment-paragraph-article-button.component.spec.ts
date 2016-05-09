import {CommentParagraphArticleButtonHotspotComponent} from "./comment-paragraph-article-button.component";
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import * as helpers from "../../../spec/helpers";
import {Provider} from 'ng-forward';
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

let htmlTemplate = '<comment-paragraph-article-button-hotspot [article]="ctrl.article"></comment-paragraph-article-button-hotspot>';

describe("Components", () => {
    describe("Comment Paragraph Article Button Hotspot Component", () => {

        let serviceMock = jasmine.createSpyObj("CommentParagraphService", ["deactivateCommentParagraph", "activateCommentParagraph"]);
        let eventServiceMock = jasmine.createSpyObj("CommentParagraphEventService", ["toggleCommentParagraph"]);

        let providers = [
            new Provider('CommentParagraphService', { useValue: serviceMock }),
            new Provider('CommentParagraphEventService', { useValue: eventServiceMock })
        ].concat(helpers.provideFilters('translateFilter'));
        let helper: ComponentTestHelper;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [CommentParagraphArticleButtonHotspotComponent],
                providers: providers,
                properties: {
                    article: {}
                }
            });
            helper = new ComponentTestHelper(cls, done);
        });

        it('emit event when deactivate comment paragraph in an article', () => {
            serviceMock.deactivateCommentParagraph = jasmine.createSpy("deactivateCommentParagraph").and.returnValue(
                { then: (fn: Function) => { fn({ data: {} }); } }
            );
            eventServiceMock.toggleCommentParagraph = jasmine.createSpy("toggleCommentParagraph");
            helper.component.deactivateCommentParagraph();

            expect(serviceMock.deactivateCommentParagraph).toHaveBeenCalled();
            expect(eventServiceMock.toggleCommentParagraph).toHaveBeenCalled();
        });

        it('emit event when activate comment paragraph in an article', () => {
            serviceMock.activateCommentParagraph = jasmine.createSpy("activateCommentParagraph").and.returnValue(
                { then: (fn: Function) => { fn({ data: {} }); } }
            );
            eventServiceMock.toggleCommentParagraph = jasmine.createSpy("toggleCommentParagraph");
            helper.component.activateCommentParagraph();

            expect(serviceMock.activateCommentParagraph).toHaveBeenCalled();
            expect(eventServiceMock.toggleCommentParagraph).toHaveBeenCalled();
        });

        it('return true when comment paragraph is active', () => {
            helper.component.article = { setting: { comment_paragraph_plugin_activate: true } };
            helper.detectChanges();
            expect(helper.component.isActivated()).toBeTruthy();
        });

        it('return false when comment paragraph is not active', () => {
            expect(helper.component.isActivated()).toBeFalsy();
        });

        it('return false when article has no setting attribute', () => {
            helper.component.article = {};
            helper.detectChanges();
            expect(helper.component.isActivated()).toBeFalsy();
        });

        it('display activate button when comment paragraph is not active', () => {
            expect(helper.all('.comment-paragraph-activate').length).toEqual(1);
            expect(helper.all('.comment-paragraph-deactivate').length).toEqual(0);
        });

        it('display deactivate button when comment paragraph is active', () => {
            helper.component.article = { setting: { comment_paragraph_plugin_activate: true } };
            helper.detectChanges();
            expect(helper.all('.comment-paragraph-deactivate').length).toEqual(1);
            expect(helper.all('.comment-paragraph-activate').length).toEqual(0);
        });
    });
});
