// import { provide } from 'ng-forward';
// import { ComponentTestHelper, createClass } from './../../../../spec/component-test-helper';
// import { SectionBlockComponent } from './section-block.component';
// import * as helpers from "../../../../spec/helpers";
//
// const htmlTemplate: string = '<noosfero-section-block-plugin-section-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-section-block-plugin-section-block>';
//
// describe("Components", () => {
//
//     describe("Section Block Component", () => {
//
//         let helper: ComponentTestHelper<SectionBlockComponent>;
//         let scope = jasmine.createSpyObj("$scope", ["$watch", "$apply"]);
//         let blockService = jasmine.createSpyObj("BlockService", ["uploadImages"]);
//         beforeEach(angular.mock.module("templates"));
//         let imageURL = "aURL";
//
//
//         beforeEach((done: Function) => {
//             let cls = createClass({
//                 template: htmlTemplate,
//                 directives: [SectionBlockComponent],
//                 properties: {
//                     block: {
//                         settings: {
//                             name: "New Section",
//                             description: "This is a Section Description!",
//                             font_color: "000000",
//                             background_color: "C0C0C0",
//                         },
//                         images: [
//                             {
//                                 url: imageURL
//                             }
//                         ]
//                     }
//                 },
//                 providers: [
//                     helpers.createProviderToValue("BlockService", blockService),
//                     helpers.createProviderToValue('$scope', scope),
//                     helpers.createProviderToValue('$uibModal', helpers.mocks.$modal)
//                 ]
//
//             });
//             helper = new ComponentTestHelper<SectionBlockComponent>(cls, done);
//         });
//
//         it("should display name equals to 'New Section'", () => {
//             expect(helper.component.block.settings.name).toEqual("New Section");
//         });
//
//         it("should display description equals to 'This is a Section Description!'", () => {
//             expect(helper.component.block.settings.description).toEqual("This is a Section Description!");
//         });
//
//         it("should have font color equal to '000000'", () => {
//             expect(helper.component.block.settings.font_color).toEqual("000000");
//         });
//
//         it("should have background color equals 'C0C0C0", () => {
//             expect(helper.component.block.settings.background_color).toEqual("C0C0C0");
//         });
//
//         it("should contain font color on css inline style", () => {
//             expect(helper.component.colors()).toContain("color: #000000;");
//         });
//
//         it("should contain background color on css inline style", () => {
//             expect(helper.component.colors()).toContain("background-color: #C0C0C0;");
//         });
//
//         it("should show the first image from block images", () => {
//             expect( helper.find(".section_image").attr("src")).toEqual(imageURL);
//         });
//
//         it("should activate edition mode", () => {
//             helper.component.designMode = true;
//             helper.detectChanges();
//             expect(helper.find(".hovereffect")).toBeDefined();
//         });
//
//         it("should deactivate edition mode", () => {
//             helper.component.designMode = false;
//             helper.detectChanges();
//             expect(helper.find(".hovereffect")).toBeUndefined();
//         });
//
//         it("should open modal image editor when select valid file", () => {
//             helper.component.fileSelected("file", null);
//             expect(helpers.mocks.$modal.open).toHaveBeenCalled();
//         });
//
//     });
// });
