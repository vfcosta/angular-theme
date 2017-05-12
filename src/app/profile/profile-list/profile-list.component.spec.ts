import { ProfileLinkComponent } from './../profile-link/profile-link.component';
import { UiSrefDirective } from './../../shared/directives/ui-sref-directive';
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
        let state = jasmine.createSpyObj("$state", ["href"]);

        let transitionFunction: Function;
        let transitions = jasmine.createSpyObj("$transitions", ["onSuccess"]);
        transitions.onSuccess = (obj, func: Function) => {
            transitionFunction = func;
        };

        let profiles = [
            { id: 1, identifier: 'profile1' },
            { id: 2, identifier: 'profile2' }
        ];

        beforeEach(async(() => {

            TestBed.configureTestingModule({
                declarations: [ProfileListComponent, MockPipe, UiSrefDirective, ProfileLinkComponent],
                providers: [
                    { provide: "$state", useValue: state },
                    { provide: "$transitions", useValue: transitions },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileListComponent);
                component = fixture.componentInstance;
                component.profiles = <any>profiles;
            });

        }));

        it("render the profile image for each profile", (fakeAsync(() => {
            fixture.detectChanges();
            transitionFunction({$to: () => { return { toState: { name: 'new-route' } }; }});
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('noosfero-profile-image')).length).toEqual(2);
        })));

        it("render profiles", () => {
            fixture.detectChanges();
            transitionFunction({$to: () => { return {name: 'new-route' }; }});
            expect(fixture.debugElement.queryAll(By.css(".profile-item")).length).toEqual(2);
        });

    });

});
