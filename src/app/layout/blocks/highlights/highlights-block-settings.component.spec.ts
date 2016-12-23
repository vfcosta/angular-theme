import { Component } from 'ng-forward';
import { HighlightsBlockSettingsComponent } from './highlights-block-settings.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-highlights-block-settings  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-highlights-block-settings>';

describe("Highlights Block Settings Component", () => {

    let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
    let testDataUrl = "data:image/png;base64," + expectedData;
    let helper: ComponentTestHelper<HighlightsBlockSettingsComponent>;
    let blockService = jasmine.createSpyObj("BlockService", ["uploadImages"]);
    let upload = jasmine.createSpyObj("Upload", ["dataUrl"]);

    beforeEach(() => {
        angular.mock.module("templates");
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [HighlightsBlockSettingsComponent],
            properties: {
                block: {
                    id: 1,
                    settings: { interval: 2, shuffle: true },
                    api_content: { slides: [{ image_src: "image.png" }] }
                }
            },
            providers: [
                helpers.createProviderToValue('TranslatorService', helpers.mocks.translatorService),
                helpers.createProviderToValue('BlockService', blockService),
                helpers.createProviderToValue('Upload', upload)
            ]
        });
        helper = new ComponentTestHelper<HighlightsBlockSettingsComponent>(cls, done);
    });

    it("display block settings", () => {
        expect(helper.all(".highlights-block-settings").length).toEqual(1);
    });

    it("add an empty slide", () => {
        helper.component.addSlide();
        helper.detectChanges();
        expect(helper.all(".highlights-block-settings .slide .thumbnail img").length).toEqual(2);
    });

    it("remove slide", () => {
        helper.component.removeSlide(0);
        helper.detectChanges();
        expect(helper.all(".highlights-block-settings .slide .thumbnail img").length).toEqual(0);
    });

    it("update active slide on selection", () => {
        helper.component.selectSlide(1);
        expect((<any>helper.component.block).active).toEqual(1);
    });

    it("default to empty array when there is no block images", () => {
        helper.component.block.api_content = { slides: null };
        helper.component.ngOnInit();
        expect(helper.component.images).toEqual([]);
    });

    it("do nothing when no file was selected", () => {
        helper.component.fileSelected(null, null, null);
        expect(upload.dataUrl).not.toHaveBeenCalled();
    });

    it("upload image when a file was selected", () => {
        upload.dataUrl = jasmine.createSpy("dataUrl").and.returnValue(helpers.mocks.promiseResultTemplate(testDataUrl));
        blockService.uploadImages = jasmine.createSpy("uploadImages").and.returnValue(helpers.mocks.promiseResultTemplate({ data: { images: [{ id: 10, url: "url" }] } }));
        helper.component.fileSelected({ name: "img.png" }, {}, {});
        expect(blockService.uploadImages).toHaveBeenCalled();
    });

    it("get data", () => {
        let result = helper.component.getData(testDataUrl);
        expect(result).toBe(expectedData);
    });

    it("get image name", () => {
        let result = helper.component.getImageName("image");
        expect(result).toBe("1_image");
    });
});
