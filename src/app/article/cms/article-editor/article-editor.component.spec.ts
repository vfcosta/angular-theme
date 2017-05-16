import {ArticleEditorComponent} from './article-editor.component';
import {ComponentTestHelper, createClass} from '../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<article-editor [article]="ctrl.article" [profile]="ctrl.profile"></article-editor>';

describe("Components", () => {
    describe("Article Editor Component", () => {

        let helper: ComponentTestHelper<ArticleEditorComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: { type: "TextArticle", parent: { id: 20 } }, profile: { id: 10 } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [ArticleEditorComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({}))
                ]
            });
            helper = new ComponentTestHelper<ArticleEditorComponent>(cls, done);
        });

        it("replace element with article basic editor when type is TextArticle", () => {
            expect(helper.find("article-basic-editor").length).toEqual(1);
        });
    });
});
