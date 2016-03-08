import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import {ProfileImageBlock} from './profile-image.component';

import {ProfileService} from "./../../../../lib/ng-noosfero-api/http/profile.service";

import * as helpers from "./../../../../spec/helpers";

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-profile-image-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-profile-image-block>';




describe("Components", () => {
    describe("Profile Image Block Component", () => {

        beforeEach(angular.mock.module("templates"));
        
        //beforeEach(angular.mock.module("restangular"));
        
        function buildServiceMock() {
            let profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getActivities"]);

            let thenObj = jasmine.createSpyObj("thenObj", ["then"]);

            thenObj.then = (func: Function) => {
                func({
                    data: {
                        image: {
                            name: 'some-thing',
                            url: 'http://image.com'
                        }
                    }
                })
            }

            profileServiceMock.getActivities = jasmine.createSpy("getActivities").and.returnValue(thenObj);

            return profileServiceMock;
        }

        @Component(
            {
                selector: 'test-container-component',
                template: htmlTemplate,
                directives: [ProfileImageBlock],
                providers: [helpers.createProviderToValue("ProfileService", buildServiceMock())]

            })
        class BlockContainerComponent {
            block = { type: 'Block' };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }
        
        

        it("show image if present", () => {
            let profileServiceMock = buildServiceMock();
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                var elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.query('div.profile-image-block').length).toEqual(1);
            });
        });
        
        //TODO
        it("not show image if image is missing", () => {
           
        });
        
        it("has link to the profile", () => {
           
        });

        it("get activitities from profileService", () => {


            let profileServiceMock = buildServiceMock();
            
            let profileImageBlock = new ProfileImageBlock(<any>profileServiceMock);

            profileImageBlock.ngOnInit();
            expect(profileServiceMock.getActivities).toHaveBeenCalled();
            expect(profileImageBlock.image.name).toEqual("some-thing");
        })

        //         it("render the profile image", done => {
        //             tcb.createAsync(BlockContainerComponent).then(fixture => {
        //                 expect(fixture.debugElement.queryAll("noosfero-profile-image").length).toEqual(1);
        //                 done();
        //             });
        //         });
        // 
        //         it("render the settings link", done => {
        //             tcb.createAsync(BlockContainerComponent).then(fixture => {
        //                 expect(fixture.debugElement.queryAll(".settings-link").length).toEqual(1);
        //                 done();
        //             });
        //         });

    });
});