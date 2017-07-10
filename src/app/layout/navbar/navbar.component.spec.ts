import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from './../../shared/services/translator.service';
import { AuthService } from './../../login/auth.service';
import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { SessionService } from './../../login/session.service';
import { HeaderService } from './../../shared/services/header.service';
import { CollapseModule } from 'ngx-bootstrap';
import { NavbarComponent } from './navbar.component';
import * as helpers from './../../../spec/helpers';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("Components", () => {
    describe("Navbar Component", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<NavbarComponent>;
        let component: NavbarComponent;
        let user: noosfero.User = <noosfero.User>{ id: 1, login: "user" };
        let authSubscribe: Function[];

        beforeEach(async(() => {
            authSubscribe = [];
            spyOn(mocks.environmentService, "getCurrentEnvironment").and.returnValue(Promise.resolve({}));
            spyOn(mocks.sessionService, "currentUser").and.returnValue(user);
            spyOn(mocks.authService, "logout").and.callThrough();
            spyOn(mocks.authService, "subscribe").and.callFake((ev: string, fn: Function) => {
                authSubscribe.push(fn);
            });
            TestBed.configureTestingModule({
                declarations: [NavbarComponent],
                providers: [
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: "Window", useValue: mocks.window },
                    { provide: EnvironmentService, useValue: mocks.environmentService },
                    { provide: HeaderService, useValue: mocks.headerService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [CollapseModule.forRoot(), TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(NavbarComponent);
            component = fixture.componentInstance;
        }));

        it('should get the loggedIn user', () => {
            expect(component["currentUser"]).toEqual(user);
        });

        it('should open on click', () => {
            component.openLogin();
            expect(component.showLoginModal).toBeTruthy();
        });

        it('should logout', () => {
            component.logout();
            expect(mocks.authService.logout).toHaveBeenCalled();
        });

        it('should not open modal user when logged in', () => {
            component.activate();
            expect(component.showLoginModal).toBeFalsy();
        });

        it('should open modal when user not logged in', () => {
            component['currentUser'] = null;
            component.activate();
            expect(component.showLoginModal).toBeTruthy();
        });

        it('closes the modal after login', () => {
            authSubscribe[0]();
            expect(component.showLoginModal).toBeFalsy();
        });
    });
});
