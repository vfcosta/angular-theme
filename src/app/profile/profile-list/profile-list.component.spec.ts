import { RouterTestingModule } from '@angular/router/testing';
import { ProfileLinkComponent } from './../profile-link/profile-link.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileListComponent } from './profile-list.component';
import {Pipe, PipeTransform} from '@angular/core';

describe("Components", () => {
    describe("Profile List Component", () => {

        @Pipe({ name: 'shorten' })
        class MockPipe implements PipeTransform {
            transform(value: number): number {
                // Do nothing
                return value;
            }
        }

        let fixture: ComponentFixture<ProfileListComponent>;
        let component: ProfileListComponent;
        const state = jasmine.createSpyObj("$state", ["href"]);

        const profiles = [
            { id: 1, identifier: 'profile1' },
            { id: 2, identifier: 'profile2' }
        ];

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProfileListComponent, MockPipe, ProfileLinkComponent],
                providers: [
                ],
                imports: [RouterTestingModule],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            });
            fixture = TestBed.createComponent(ProfileListComponent);
            component = fixture.componentInstance;
            component.profiles = <any>profiles;
        }));

        it("render the profile image for each profile", (fakeAsync(() => {
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('noosfero-profile-image')).length).toEqual(2);
        })));

        it("render profiles", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".profile-item")).length).toEqual(2);
        });

        it("has default style type *avatar*", () => {
            expect(component.displayStyle).toEqual('avatar');
        });

        it("check current style type", () => {
            component.displayStyle = 'card';
            fixture.detectChanges();
            expect(component.isCurrentStyle('avatar')).toBeFalsy();
            expect(component.isCurrentStyle('card')).toBeTruthy();
        });

        it("not render profile name when style type is avatar", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".profile-name")).length).toEqual(0);
        });

        it("render profile name when style type is card", () => {
            component.displayStyle = 'card';
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css(".profile-name")).length).toEqual(2);
        });

    });

});
