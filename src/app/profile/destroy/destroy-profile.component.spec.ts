import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../shared/services/notification.service';
import { AuthService } from './../../login/auth.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DestroyProfileComponent } from './destroy-profile.component';
import * as helpers from '../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';

describe("Components", () => {
    describe("Destroy Profile Component", () => {
        const profile = { id: 1, identifier: "profile" };
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            mocks.route.parent.snapshot.data = { profile: {} };
            spyOn(mocks.router, 'navigate');
            spyOn(mocks.notificationService, 'confirmation').and.callThrough();
            spyOn(mocks.notificationService, 'success').and.callThrough();
            spyOn(mocks.notificationService, 'error').and.callThrough();
            spyOn(mocks.profileService, 'remove').and.callThrough();
            spyOn(mocks.profileService, 'getCurrentProfile').and.callThrough();

            TestBed.configureTestingModule({
                declarations: [DestroyProfileComponent],
                providers: [
                    { provide: Router, useValue: mocks.router },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: ActivatedRoute, useValue: mocks.route },
                ],
                schemas: [NO_ERRORS_SCHEMA]
            });
        }));

        it("display confirmation dialog", fakeAsync(() => {
            const fixture = TestBed.createComponent(DestroyProfileComponent);
            const component = fixture.componentInstance;
            fixture.detectChanges();
            tick();
            expect(mocks.notificationService.confirmation).toHaveBeenCalled();
        }));

        it("call remove in profile service when confirm", fakeAsync(() => {
            const pS = TestBed.get(ProfileService);
            const nS = TestBed.get(NotificationService);
            nS.confirmation = (p1, p2) => { p2(); };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));

            const fixture = TestBed.createComponent(DestroyProfileComponent);
            const component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            expect(mocks.profileService.remove).toHaveBeenCalled();
        }));

        it("not display confirmation dialog when profile doesn't exists", fakeAsync(() => {
            const pS = TestBed.get(ProfileService);
            const nS = TestBed.get(NotificationService);
            nS.confirmation = (p1, p2) => { p2(); };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve(null));

            const fixture = TestBed.createComponent(DestroyProfileComponent);
            const component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            expect(mocks.notificationService.confirmation).not.toHaveBeenCalled();
        }));

        it("call notification success when remove is confirmed", fakeAsync(() => {
            const pS = TestBed.get(ProfileService);
            const nS = TestBed.get(NotificationService);
            nS.confirmation = (p1, p2) => { p2(); };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));
            pS.remove = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ data: { success: true } }));

            const fixture = TestBed.createComponent(DestroyProfileComponent);
            const component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            tick();
            expect(mocks.notificationService.success).toHaveBeenCalled();
        }));

        it("call notification error when remove is not confirmed", fakeAsync(() => {
            const pS = TestBed.get(ProfileService);
            const nS = TestBed.get(NotificationService);
            const aS = TestBed.get(AuthService);
            nS.confirmation = (p1, p2) => { p2(); };
            pS.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ id: 5 }));
            pS.remove = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ data: { success: false } }));
            aS.logout = jasmine.createSpy("logout").and.callThrough();

            const fixture = TestBed.createComponent(DestroyProfileComponent);
            const component = fixture.componentInstance;

            fixture.detectChanges();
            tick();
            tick();
            tick();
            expect(mocks.notificationService.error).toHaveBeenCalled();
        }));
    });
});
