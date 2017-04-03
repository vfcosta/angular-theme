import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { NewCommunityComponent } from './new-community.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import {
    FormsModule, NG_VALIDATORS, AbstractControl,
    NgForm, FormControl
} from '@angular/forms';

describe("Components", () => {

    describe("New Community", () => {
        let fixture: ComponentFixture<NewCommunityComponent>;
        let component: NewCommunityComponent;
        let communityService = jasmine.createSpyObj("communityService", ["createNewCommunity"]);
        let state = jasmine.createSpyObj("$state", ["go"]);
        communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.resolve({}));

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [NewCommunityComponent, TranslatePipe],
                providers: [
                    { provide: "communityService", useValue: communityService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "$state", useValue: state },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(NewCommunityComponent);
                component = fixture.componentInstance;
                component.community = <noosfero.Community>{ name: 'community test', closed: true };
                component.profile = <noosfero.Profile>{ identifier: '0' };
            });
        }));

        it("creates a new community", fakeAsync(done => {
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.errors).toBeNull();
        }));

    });
});
