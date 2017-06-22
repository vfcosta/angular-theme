import { TranslatorService } from './../../shared/services/translator.service';
import { AuthService } from './../../login/auth.service';
import { EnvironmentService } from './../../../lib/ng-noosfero-api/http/environment.service';
import { SessionService } from './../../login/session.service';
import { HeaderService } from './../../shared/services/header.service';
import { CollapseModule } from 'ngx-bootstrap';
import { NavbarComponent } from './navbar.component';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import * as helpers from "./../../../spec/helpers";
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
            spyOn(mocks.$modal, "open").and.callThrough();
            spyOn(mocks.authService, "logout").and.callThrough();
            spyOn(mocks.authService, "subscribe").and.callFake((ev: string, fn: Function) => {
                authSubscribe.push(fn);
            });
            spyOn(mocks.$state, "transitionTo").and.callThrough();
            TestBed.configureTestingModule({
                declarations: [NavbarComponent, TranslatePipe],
                providers: [
                    { provide: "$uibModal", useValue: mocks.$modal },
                    { provide: AuthService, useValue: mocks.authService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: EnvironmentService, useValue: mocks.environmentService },
                    { provide: HeaderService, useValue: mocks.headerService },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [CollapseModule.forRoot()]
            });
            fixture = TestBed.createComponent(NavbarComponent);
            component = fixture.componentInstance;
        }));

        it('should get the loggedIn user', () => {
            expect(component["currentUser"]).toEqual(user);
        });

        it('should open on click', () => {
            component.openLogin();
            expect(mocks.$modal.open).toHaveBeenCalled();
        });

        it('should logout', () => {
            component.logout();
            expect(mocks.authService.logout).toHaveBeenCalled();
            expect(mocks.$state.transitionTo).toHaveBeenCalledWith('main.environment.home');
        });

        it('should not activate user when logged in', () => {
            component.activate();
            expect(mocks.$modal.open).not.toHaveBeenCalled();
        });

        it('should activate when user not logged in', () => {
            component['currentUser'] = null;
            component.activate();
            expect(mocks.$modal.open).toHaveBeenCalled();
        });

        it('closes the modal after login', () => {
            let modalInstance = jasmine.createSpyObj("modalInstance", ["close"]);
            modalInstance.close = jasmine.createSpy("close");
            component['modalInstance'] = modalInstance;
            authSubscribe[0]();
            expect(modalInstance.close).toHaveBeenCalled();
        });
    });
});
