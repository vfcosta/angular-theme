import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { EditCommunityComponent } from './edit-community.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import {
    FormsModule, NG_VALIDATORS, AbstractControl,
    NgForm, FormControl
} from '@angular/forms';

describe("Components", () => {

    describe("Update Community", () => {
        let fixture: ComponentFixture<EditCommunityComponent>;
        let component: EditCommunityComponent;
        let profileService = jasmine.createSpyObj("profileService", ["update"]);
        let communityService = jasmine.createSpyObj("communityService", ["createNewCommunity"]);
        let sessionService = jasmine.createSpyObj("sessionService", ["currentUser"]);
        sessionService.currentUser = jasmine.createSpy("currentUser").and.returnValue({ person: {id: 1, identifier: 'profile-1'} });
        let state = jasmine.createSpyObj("$state", ["go"]);
        profileService.update = jasmine.createSpy("update").and.returnValue(Promise.resolve({}));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [EditCommunityComponent, TranslatePipe],
                providers: [
                    { provide: "communityService", useValue: communityService },
                    { provide: "profileService", useValue: profileService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "sessionService", useValue: sessionService },
                    { provide: "$state", useValue: state },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(EditCommunityComponent);
                component = fixture.componentInstance;
                let admins: noosfero.Profile[] = new Array(<noosfero.Profile>{id: 1, identifier: 'profile-1'}, <noosfero.Profile>{id: 2, identifier: 'profile-2'});
                component.profile = <noosfero.Community>{ identifier: '1', name: 'community test', closed: true, type: 'Community', admins: admins};
            });
        }));

        it("update a community", fakeAsync(done => {
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.errors).toBeNull();
        }));

        it("change selection of the community acceptance", () => {
            fixture.detectChanges();
            component.onSelectionChange(true);
            expect(component.community.closed).toBeTruthy();
        });
    });
});
