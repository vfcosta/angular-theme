// import { Pipe, Input, provide, Component } from 'ng-forward';
// import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
// import * as helpers from "../../../../spec/helpers";
//
// import { SectionImageEditorComponent } from "./section-image-editor.component";
//
//
//
//
// describe("Components", () => {
//
//     describe("Section Image Editor Component", () => {
//
//         beforeEach(angular.mock.module("templates"));
//
//         let expectedData = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQ…Cm2OLHvfdNPte3zrH709Q0esN1LPQ0t7DL696ERpu+9/8BVPLIpElf7VYAAAAASUVORK5CYII=";
//         let testDataUrl = "data:image/png;base64," + expectedData;
//
//         let modal = helpers.mocks.$modal;
//         let modalInstance = jasmine.createSpyObj("$uibModalInstance", ["close"]);
//
//         let picFile = { type: "png" };
//         let blockService = jasmine.createSpyObj("BlockService", ["uploadImages"]);
//         let result = {
//             data: {
//                 images: [
//                     {
//                         url: testDataUrl
//                     }
//                 ]
//             }
//         };
//         blockService.uploadImages = jasmine.createSpy('uploadImage').and.returnValue(helpers.mocks.promiseResultTemplate( result ));
//
//         let block = {
//             id: 44,
//             settings: {
//                 name: "New Section",
//                 description: "This is a Section Description!",
//                 font_color: "000000",
//                 background_color: "C0C0C0",
//             },
//             images: [
//                 {
//                     url: testDataUrl
//                 }
//             ]
//         };
//
//
//         let comp = new SectionImageEditorComponent(picFile, block,
//             blockService, modalInstance);
//
//
//
//         it("get data", done => {
//             let result = comp.getData(testDataUrl);
//             expect(result).toBe(expectedData);
//             done();
//         });
//
//         it("get image name", done => {
//             let imageName = "image1";
//             let expectedName = comp.block.id + "_" + imageName;
//
//             let result = comp.getImageName(imageName);
//             expect(result).toBe(expectedName);
//             done();
//         });
//
//         it("upload image", done => {
//             let imageName = "image1";
//
//             comp.uploadImage(testDataUrl, imageName);
//
//             expect(comp.modalInstance.close).toHaveBeenCalled();
//
//             done();
//         });
//
//     });
// });
