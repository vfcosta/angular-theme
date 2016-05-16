import {DiscussionEditorComponent} from './discussion-editor.component';
import {ComponentTestHelper, createClass} from './../../../../../spec/component-test-helper';

const htmlTemplate: string = '<comment-paragraph-plugin-discussion-editor [article]="ctrl.article"></comment-paragraph-plugin-discussion-editor>';

describe("Components", () => {
    describe("Discussion Editor Component", () => {

        let helper: ComponentTestHelper<DiscussionEditorComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { article: {} };
            let cls = createClass({
                template: htmlTemplate,
                directives: [DiscussionEditorComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<DiscussionEditorComponent>(cls, done);
        });

        it("set start_date as article start_date when it was defined", () => {
            let article = {start_date: new Date()};
            helper.changeProperties({article: article});
            helper.component.ngOnInit();
            expect(helper.component.start_date.getTime()).toEqual(article.start_date.getTime());
        });

        it("set start_date as current date when it was not defined", () => {
            helper.changeProperties({article: {}});
            helper.component.ngOnInit();
            expect(helper.component.start_date.getTime()).toBeDefined();
        });

        it("set end_date as article end_date when it was defined", () => {
            let article = {end_date: new Date()};
            helper.changeProperties({article: article});
            helper.component.ngOnInit();
            expect(helper.component.end_date.getTime()).toEqual(article.end_date.getTime());
        });
    });
});
