import { Component } from 'ng-forward';
import { BlockEditionComponent } from './block-edition.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-block-edition></noosfero-block-edition>';

describe("Boxes Component", () => {

    let helper: ComponentTestHelper<BlockEditionComponent>;

    beforeEach(() => {
        angular.mock.module("templates");
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [BlockEditionComponent],
            properties: { block: { settings: <any>{} } }
        });
        helper = new ComponentTestHelper<BlockEditionComponent>(cls, done);
    });

    it("return true for first option when setting is null", () => {
        expect(helper.component.isOptionSelected("display", "always")).toBeTruthy();
    });

    it("return false for other options when setting is null", () => {
        expect(helper.component.isOptionSelected("display", "home_page_only")).toBeFalsy();
    });

    it("change block setting when select an option", () => {
        helper.component.selectOption("display", "never");
        expect(helper.component.isOptionSelected("display", "never")).toBeTruthy();
    });
});
