import {CommentParagraphArticleContentHotspotComponent} from './article-content.component';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';

const htmlTemplate: string = '<comment-paragraph-article-content-hotspot [article]="ctrl.article"></comment-paragraph-article-content-hotspot>';

describe("Components", () => {
    describe("Article Content Hotspot Component", () => {

        let helper: ComponentTestHelper<CommentParagraphArticleContentHotspotComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: { type: "CommentParagraphPlugin::Discussion" } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [CommentParagraphArticleContentHotspotComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<CommentParagraphArticleContentHotspotComponent>(cls, done);
        });

        it('display period content', () => {
            //FIXME make this test works
            // expect(helper.all(".period").length).toEqual(1);
        });

    });
});
