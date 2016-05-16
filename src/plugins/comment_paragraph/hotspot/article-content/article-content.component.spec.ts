import {CommentParagraphArticleContentHotspotComponent} from './article-content.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

const htmlTemplate: string = '<comment-paragraph-article-content-hotspot [article]="ctrl.article"></comment-paragraph-article-content-hotspot>';

describe("Components", () => {
    describe("Article Content Hotspot Component", () => {

        let helper: ComponentTestHelper<CommentParagraphArticleContentHotspotComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: {} };
            let cls = createClass({
                template: htmlTemplate,
                directives: [CommentParagraphArticleContentHotspotComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<CommentParagraphArticleContentHotspotComponent>(cls, done);
        });

        it("return false in isDiscussion when no type was specified", () => {
            expect(helper.component.isDiscussion()).toBeFalsy();
        });

        it("return false in isDiscussion when other type was specified", () => {
          helper.changeProperties({article: {type: "TextArticle"}});
            expect(helper.component.isDiscussion()).toBeFalsy();
        });

        it("return true in isDiscussion when discussion type was specified", () => {
            helper.changeProperties({article: {type: "CommentParagraphPlugin::Discussion"}});
            expect(helper.component.isDiscussion()).toBeTruthy();
        });
    });
});
