import { UiSrefDirective } from './../../shared/directives/ui-sref-directive';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListProfilesComponent } from './list-profiles.component';

describe("Components", () => {

    describe("List Profiles Component", () => {

        let fixture: ComponentFixture<ListProfilesComponent>;
        let component: ListProfilesComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);

        let profiles = [
            { id: 1, identifier: 'profile1' }, 
            { id: 2, identifier: 'profile2' }
        ];

        beforeEach(async(() => {

            TestBed.configureTestingModule({
                declarations: [ ListProfilesComponent, UiSrefDirective ],
                providers: [
                    { provide: "$state", useValue: state },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ListProfilesComponent);
                component = fixture.componentInstance;
                component.profiles = <any>profiles;
            });

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

    });

});