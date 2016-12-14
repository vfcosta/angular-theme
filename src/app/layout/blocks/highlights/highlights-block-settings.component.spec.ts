import { Component } from 'ng-forward';
import { HighlightsBlockSettingsComponent } from './highlights-block-settings.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-highlights-block-settings  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-highlights-block-settings>';

describe("Highlights Block Component", () => {

    let helper: ComponentTestHelper<HighlightsBlockSettingsComponent>;

    beforeEach(() => {
        angular.mock.module("templates");
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [HighlightsBlockSettingsComponent],
            properties: {
                block: {
                    settings: { interval: 2, shuffle: true }
                }
            }
        });
        helper = new ComponentTestHelper<HighlightsBlockSettingsComponent>(cls, done);
    });

    it("display block settings", () => {
        expect(helper.all(".highlights-block-settings").length).toEqual(1);
    });

});
