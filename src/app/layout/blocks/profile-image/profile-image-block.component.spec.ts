import { TestComponentBuilder, ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';
import { Pipe, Input, provide, Component } from 'ng-forward';

import { ProfileImageBlockComponent } from './profile-image-block.component';

import * as helpers from "./../../../../spec/helpers";

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-profile-image-block  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-profile-image-block>';

describe("Components", () => {

    describe("Profile Image Block Component", () => {

        beforeEach(angular.mock.module("templates"));
        let personService = jasmine.createSpyObj("personService", ["upload"]);

        let profileService = jasmine.createSpyObj("ProfileService", ["isMember", "addMember", "removeMember"]);
        profileService.isMember = jasmine.createSpy("isMember").and.returnValue(Promise.resolve(false));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ProfileImageBlockComponent],
            providers: [
                helpers.createProviderToValue('SessionService', helpers.mocks.sessionWithCurrentUser({})),
                helpers.createProviderToValue("PersonService", personService),
                helpers.createProviderToValue("$uibModal", helpers.mocks.$modal),
                helpers.createProviderToValue('ProfileService', profileService),
                helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService)
            ].concat(helpers.provideFilters("translateFilter"))
        })
        class BlockContainerComponent {
            block = { type: 'Block' };
            owner = { name: 'profile-name' };
            constructor() { }
        }

        it("show image if present", () => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.query('div.profile-image-block').length).toEqual(1);
            });
        });

        it("has link to the profile", () => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.query('a.settings-link').length).toEqual(1);
            });
        });

        it("display button to join community", (done: Function) => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.componentInstance.displayOrganizationActions()).toBeTruthy();
                expect(elProfile.query('.actions .organization-actions .join').length).toEqual(1);
                done();
            });
        });

        it("not display button to join community for person", (done: Function) => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                elProfile.componentInstance.owner = { name: 'person-name', type: 'Person' };
                fixture.detectChanges();
                expect(elProfile.componentInstance.displayOrganizationActions()).toBeFalsy();
                expect(elProfile.queryAll('.actions .organization-actions .join').length).toEqual(0);
                done();
            });
        });

        it("display button to leave community", (done: Function) => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                elProfile.componentInstance['isMember'] = true;
                fixture.detectChanges();
                expect(elProfile.query('.actions .leave').length).toEqual(1);
                done();
            });
        });

        it("join community", (done: Function) => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                profileService.addMember = jasmine.createSpy("addMember").and.returnValue(Promise.resolve({ data: {} }));
                elProfile.componentInstance.join();
                expect(profileService.addMember).toHaveBeenCalled();
                done();
            });
        });

        it("leave community", (done: Function) => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                profileService.removeMember = jasmine.createSpy("removeMember").and.returnValue(Promise.resolve({ data: {} }));
                elProfile.componentInstance.leave();
                expect(profileService.removeMember).toHaveBeenCalled();
                done();
            });
        });
    });
});
