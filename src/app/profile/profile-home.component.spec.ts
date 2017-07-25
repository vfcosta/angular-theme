import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService } from './../../lib/ng-noosfero-api/http/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from '../../spec/helpers';
import {ProfileHomeComponent} from './profile-home.component';

describe("Components", () => {
    describe("Profile Home Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<ProfileHomeComponent>;
        let component: ProfileHomeComponent;

        beforeEach(async(() => {
            spyOn(mocks.router, 'navigate');
            mocks.route.snapshot.data['profile'] = mocks.profile;
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, TranslateModule.forRoot()],
                declarations: [ProfileHomeComponent],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: Router, useValue: mocks.router },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
        }));

        it("transition to profile homepage when there is a homepage setted", fakeAsync(() => {
            spyOn(mocks.profileService, 'getHomePage').and.returnValue(Promise.resolve({ data: { path: "something" } }));
            fixture = TestBed.createComponent(ProfileHomeComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>mocks.profile;
            expect(mocks.profileService.getHomePage).toHaveBeenCalled();
            tick();
            expect(mocks.router.navigate).toHaveBeenCalledWith(['/', 'profile-id', 'something'], { skipLocationChange: true });
        }));

        it("transition to profile info page when there is no homepage setted", fakeAsync(() => {
            spyOn(mocks.profileService, 'getHomePage').and.returnValue(Promise.resolve({ data: {} }));
            fixture = TestBed.createComponent(ProfileHomeComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>mocks.profile;
            expect(mocks.profileService.getHomePage).toHaveBeenCalled();
            tick();
            expect(mocks.router.navigate).toHaveBeenCalledWith(['/', 'profile-id']);
        }));
    });
});
