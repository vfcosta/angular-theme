import { NotificationService } from './../../shared/services/notification.service';
import { AuthService } from './../../login/auth.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DestroyProfileComponent } from './destroy-profile.component';
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Destroy Profile Component", () => {
        let profile = { id: 1, identifier: "profile" };

        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<DestroyProfileComponent>;
        let component: DestroyProfileComponent;

        beforeEach(async(() => {
            spyOn(mocks.$state, 'go').and.callThrough();
            spyOn(mocks.notificationService, 'confirmation').and.callThrough();
            spyOn(mocks.notificationService, 'success').and.callThrough();
            spyOn(mocks.notificationService, 'error').and.callThrough();
            spyOn(mocks.profileService, 'remove').and.callThrough();
            spyOn(mocks.profileService, 'getCurrentProfile').and.callThrough();

            TestBed.configureTestingModule({
                declarations: [DestroyProfileComponent],
                providers: [
                    { provide: "$state", useValue: mocks.$state },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: AuthService, useValue: mocks.authService }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            });
        }));

        it("display confirmation dialog", fakeAsync(() => {
            let fixture = TestBed.createComponent(DestroyProfileComponent);
            let component = fixture.componentInstance;
            fixture.detectChanges();
            tick();
            expect(mocks.notificationService.confirmation).toHaveBeenCalled();
        }));

        it("call remove in profile service when confirm", fakeAsync(() => {
            let pS = TestBed.get(ProfileService);
            let nS = TestBed.get(NotificationService);
            nS.confirmation = (p1, p2) => { p2(); };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));

            let fixture = TestBed.createComponent(DestroyProfileComponent);
            let component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            expect(mocks.profileService.remove).toHaveBeenCalled();
        }));

        it("not display confirmation dialog when profile doesn't exists", fakeAsync(() => {
            let pS = TestBed.get(ProfileService);
            let nS = TestBed.get(NotificationService);
            nS.confirmation = (p1, p2) => { p2() };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve(null));

            let fixture = TestBed.createComponent(DestroyProfileComponent);
            let component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            expect(mocks.notificationService.confirmation).not.toHaveBeenCalled();
        }));

        it("call notification success when remove is confirmed", fakeAsync(() => {
            let pS = TestBed.get(ProfileService);
            let nS = TestBed.get(NotificationService);
            let state = TestBed.get('$state');
            nS.confirmation = (p1, p2) => { p2() };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));
            pS.remove = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ data: { success: true } }));
            state.go = jasmine.createSpy("go").and.callThrough();

            let fixture = TestBed.createComponent(DestroyProfileComponent);
            let component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            tick();
            expect(mocks.notificationService.success).toHaveBeenCalled();
        }));

        it("call notification error when remove is not confirmed", fakeAsync(() => {
            let pS = TestBed.get(ProfileService);
            let nS = TestBed.get(NotificationService);
            let state = TestBed.get('$state');
            let aS = TestBed.get(AuthService);
            nS.confirmation = (p1, p2) => { p2() };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));
            pS.remove = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ data: { success: false } }));
            state.go = jasmine.createSpy("go").and.callThrough();
            aS.logout = jasmine.createSpy("logout").and.callThrough();

            let fixture = TestBed.createComponent(DestroyProfileComponent);
            let component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            tick();
            expect(mocks.notificationService.error).toHaveBeenCalled();
        }));
    });
});
