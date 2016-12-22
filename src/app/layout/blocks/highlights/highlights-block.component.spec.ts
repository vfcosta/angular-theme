import { Component } from 'ng-forward';
import { HighlightsBlockComponent } from './highlights-block.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-highlights-block  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-highlights-block>';

describe("Highlights Block Component", () => {

    let helper: ComponentTestHelper<HighlightsBlockComponent>;

    beforeEach(() => {
        angular.mock.module("templates");
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [HighlightsBlockComponent],
            properties: {
                block: {
                    settings: { interval: 2, shuffle: true }
                }
            }
        });
        helper = new ComponentTestHelper<HighlightsBlockComponent>(cls, done);
    });

    it("link target should be empty when new_window is false", () => {
        expect(helper.component.getTarget({ new_window: false })).toEqual("");
    });

    it("link target should be _blank when new_window is true", () => {
        expect(helper.component.getTarget({ new_window: true })).toEqual("_blank");
    });

    it("return transition interval in miliseconds", () => {
        expect(helper.component.getTransitionInterval()).toEqual(2000);
    });

    it("not render highlights block if there is no image", () => {
        expect(helper.component.block.hide).toBeTruthy();
    });

    it("render highlights block if there are images on block", () => {
        helper.component.block.api_content = { slides: [{ id: 1 }] };
        helper.component.ngOnInit();
        expect(helper.component.block.hide).toBeFalsy();
    });

    it("not render highlights block if images array is empty", () => {
        helper.component.block.api_content = { slides: [] };
        helper.component.ngOnInit();
        expect(helper.component.block.hide).toBeTruthy();
    });

    it("transition interval should be zero in design mode", () => {
        (<any>helper.component.block.settings).interval = 5;
        helper.component.designMode = true;
        expect(helper.component.getTransitionInterval()).toEqual(0);
    });

    it("return transition interval in miliseconds when not in design mode", () => {
        (<any>helper.component.block.settings).interval = 5;
        helper.component.designMode = false;
        expect(helper.component.getTransitionInterval()).toEqual(5000);
    });
});
