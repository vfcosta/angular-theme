import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {HtmlEditorComponent} from "./html-editor.component";

const htmlTemplate: string = '<html-editor [(value)]="ctrl.value" [options]="ctrl.options"></html-editor>';

describe("Components", () => {
    describe("Html Editor Component", () => {

        let helper: ComponentTestHelper<HtmlEditorComponent>;
        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let properties = { value: "value" };
            let cls = createClass({
                template: htmlTemplate,
                directives: [HtmlEditorComponent],
                properties: properties
            });
            helper = new ComponentTestHelper<HtmlEditorComponent>(cls, done);
        });

        it("render a textarea", () => {
            expect(helper.find("textarea").length).toEqual(1);
        });
    });
});
