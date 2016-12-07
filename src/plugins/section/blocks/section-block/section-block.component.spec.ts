import {provide} from 'ng-forward';
import {ComponentTestHelper, createClass} from './../../../../spec/component-test-helper';
import {SectionBlockComponent} from './section-block.component';
import * as helpers from "../../../../spec/helpers";

const htmlTemplate: string = '<noosfero-section-block-plugin-section-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-section-block-plugin-section-block>';

describe("Components", () => {

    describe("Section Block Component", () => {

        let helper: ComponentTestHelper<SectionBlockComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [SectionBlockComponent],
                properties: {
                    name: "New Section",
                    description: "This is a Section Description!",
                    font_color: "000000",
                    background_color: "C0C0C0"
                }
            });
            helper = new ComponentTestHelper<SectionBlockComponent>(cls, done);
        });

        it("should display name equals to 'New Section'", () => {
            expect(helper.component.name).toEqual("New Section");
        });

        it("should display description equals to 'This is a Section Description!'", () => {
            expect(helper.component.description).toEqual("This is a Section Description!");
        });

        it("should have font color equal to '000000'", () => {
            expect(helper.component.font_color).toEqual("000000");
        });

        it("should have background color equals 'C0C0C0", () => {
            expect(helper.component.background_color).toEqual("C0C0C0");
        });

        it("should contain font color on css inline style", () => {
            expect(helper.component.colors()).toContain("color: #000000;");
        });

        it("should contain background color on css inline style", () => {
            expect(helper.component.colors()).toContain("background-color: #C0C0C0;");
        });

    });
});
