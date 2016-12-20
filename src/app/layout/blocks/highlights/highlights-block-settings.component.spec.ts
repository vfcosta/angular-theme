import { Component } from 'ng-forward';
import { HighlightsBlockSettingsComponent } from './highlights-block-settings.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-highlights-block-settings  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-highlights-block-settings>';

describe("Highlights Block Settings Component", () => {

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
                    settings: { interval: 2, shuffle: true, block_images: [{ image_src: "image.png" }] }
                }
            },
            providers: [helpers.createProviderToValue('TranslatorService', helpers.mocks.translatorService)]
        });
        helper = new ComponentTestHelper<HighlightsBlockSettingsComponent>(cls, done);
    });

    it("display block settings", () => {
        expect(helper.all(".highlights-block-settings").length).toEqual(1);
    });

    it("add an empty slide", () => {
        helper.component.addSlide();
        helper.detectChanges();
        expect(helper.all(".highlights-block-settings .slide .thumbnail").length).toEqual(2);
    });

    it("remove slide", () => {
        helper.component.removeSlide(0);
        helper.detectChanges();
        expect(helper.all(".highlights-block-settings .slide .thumbnail").length).toEqual(0);
    });

    it("update active slide on selection", () => {
        helper.component.selectSlide(1);
        expect((<any>helper.component.block).active).toEqual(1);
    });

    it("default to empty array when there is no block images", () => {
        (<any>helper.component.block.settings).block_images = null;
        helper.component.ngOnInit();
        expect(helper.component.images).toEqual([]);
    });
});
