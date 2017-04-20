import { ProfileImageBlockComponent } from './profile-image-block.component';
import * as helpers from "./../../../../spec/helpers";
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Profile Image  Block Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ProfileImageBlockComponent>;
        let component: ProfileImageBlockComponent;
        let person = <noosfero.Person>{ id: 1, identifier: 'some' };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProfileImageBlockComponent],
                providers: [
                    { provide: "blockService", useValue: mocks.blockService }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileImageBlockComponent);
                component = fixture.componentInstance;
                component.owner = person;
                component.block = <noosfero.Block>{ id: 1 };
            });
        }));

        it("render the images defined on block", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css("noosfero-profile-image")).length).toEqual(1);
        });
    });

});
