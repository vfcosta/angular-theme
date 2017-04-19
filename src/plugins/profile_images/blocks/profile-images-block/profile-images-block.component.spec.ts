// import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
// import {Provider, Input, provide, Component} from 'ng-forward';
// import {provideFilters} from '../../../../spec/helpers';
// import {ProfileImagesBlockComponent} from './profile-images-block.component';
// import * as helpers from "./../../../../spec/helpers";
//
// const htmlTemplate: string = '<noosfero-profile-images-plugin-profile-images-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-profile-images-plugin-profile-images-block>';
//
// const tcb = new TestComponentBuilder();
//
// const images = [
//     {
//         title: 'Test',
//         id: 1,
//         view_url: { host: 'localhost', page: ['image'] },
//         path: '/articles/0000/0001/test.png'
//     }
// ];
//
// describe("Components", () => {
//     describe("Profile Images Block Component", () => {
//
//         let settingsObj = {};
//         let person = <noosfero.Person>{ name: "Person" };
//         let mockedService = {
//             getApiContent: (block: noosfero.Block): any => {
//                 return Promise.resolve({ images: images, headers: (name: string) => { return name; } });
//             }
//         };
//         beforeEach(angular.mock.module("templates"));
//
//         let state = jasmine.createSpyObj("state", ["go"]);
//
//
//         function getProviders() {
//             return [
//                 new Provider('$state', { useValue: state }),
//                 new Provider('BlockService', {
//                     useValue: mockedService
//                 })
//             ].concat(provideFilters("truncateFilter", "stripTagsFilter"));
//         }
//         let componentClass: any = null;
//
//         function getComponent() {
//             @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ProfileImagesPluginProfileImagesBlockComponent], providers: getProviders() })
//             class BlockContainerComponent {
//                 block = { type: 'Block', settings: settingsObj };
//                 owner = person;
//                 constructor() {
//                 }
//             }
//             return BlockContainerComponent;
//         }
//
//         it("get images from the block service", done => {
//             tcb.createAsync(getComponent()).then(fixture => {
//                 let ProfileImagesPluginProfileImagesBlock: ProfileImagesPluginProfileImagesBlockComponent = fixture.debugElement.componentViewChildren[0].componentInstance;
//                 expect(ProfileImagesPluginProfileImagesBlock.images).toEqual(images);
//                 done();
//             });
//         });
//
//     });
// });
