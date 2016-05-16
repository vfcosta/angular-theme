import {ArticleEditorComponent} from './article-editor.component';
import {BasicEditorComponent} from "../basic-editor/basic-editor.component";
import {ComponentTestHelper, createClass} from '../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<article-editor [article]="ctrl.article"></article-editor>';

describe("Components", () => {
    describe("Article Editor Component", () => {

        let helper: ComponentTestHelper<ArticleEditorComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: { type: "TextArticle" } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [ArticleEditorComponent, BasicEditorComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<ArticleEditorComponent>(cls, done);
        });

        it("replace element with article basic editor when type is TextArticle", () => {
            expect(helper.find("article-basic-editor").length).toEqual(1);
        });
    });
});
