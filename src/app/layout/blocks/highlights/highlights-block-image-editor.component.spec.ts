import { Pipe, Input, provide, Component } from 'ng-forward';
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';
import * as helpers from "../../../../spec/helpers";

import { HighlightsBlockImageEditorComponent } from "./highlights-block-image-editor.component";

describe("Components", () => {

    describe("Highlights Block Image Editor Component", () => {

        beforeEach(angular.mock.module("templates"));

        let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
        let testDataUrl = "data:image/png;base64," + expectedData;

        let block = <noosfero.Block>{ id: 1 };
        let modal = helpers.mocks.$modal;
        let modalInstance = jasmine.createSpyObj("$uibModalInstance", ["close"]);
        let picFile = { type: "png" };
        let slide = {};
        let component: HighlightsBlockImageEditorComponent;
        let blockServiceMock = jasmine.createSpyObj("BlockService", ["uploadImages"]);

        beforeEach(() => {
            component = new HighlightsBlockImageEditorComponent(picFile, block, slide, blockServiceMock, modalInstance);
        });

        it("get data", done => {
            let result = component.getData(testDataUrl);
            expect(result).toBe(expectedData);
            done();
        });

        it("get image name", done => {
            let result = component.getImageName("image");
            expect(result).toBe("1_image");
            done();
        });

        it("upload image", done => {
            blockServiceMock.uploadImages = jasmine.createSpy("uploadImages").and.returnValue(helpers.mocks.promiseResultTemplate({ data: { images: [] } }));
            component.uploadImage(testDataUrl, "image");
            expect(component['modalInstance'].close).toHaveBeenCalled();
            done();
        });

        it("close modal when cancel", done => {
            component.cancel();
            expect(component['modalInstance'].close).toHaveBeenCalled();
            done();
        });
    });
});
