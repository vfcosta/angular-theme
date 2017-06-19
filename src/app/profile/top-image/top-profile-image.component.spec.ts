import { PermissionService } from './../../shared/services/permission.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { TopProfileImageComponent } from './top-profile-image.component';
import * as helpers from "../../../spec/helpers";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Section Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<TopProfileImageComponent>;
        let component: TopProfileImageComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TopProfileImageComponent],
                providers: [
                    { provide: PermissionService, useValue: mocks.permissionService },
                    { provide: ProfileService, useValue: mocks.profileService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(TopProfileImageComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>mocks.profile;
            fixture.detectChanges();
        }));


        it("hasTopImage be false if there is no image", () => {
            expect(component.hasTopImage()).toBeFalsy();
        });

        it("hasTopImage be true profiel has top image", () => {
            mocks.profile.top_image = '/tmp/image.png'
            expect(component.hasTopImage()).toBeTruthy();
        });

        it("is editable be true if it's editable", () => {
            component.editable = true;
            expect(component.isEditable()).toBe(true);
        });

        it("is editable be false if it's not editable", () => {
            component.editable = false;
            expect(component.isEditable()).toBe(false);
        });

        it("is not editable in editable blocks but without permission", () => {
            component.editable = true;
            component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(false);
            expect(component.isEditable()).toBe(false);
        });

        it("is editable in editable blocks with edit permission", () => {
            component.editable = true;
            component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(true);
            expect(component.isEditable()).toBe(true);
        });

    });

});
