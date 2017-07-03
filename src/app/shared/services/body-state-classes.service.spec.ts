import { DOCUMENT } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { RouterTestingModule } from '@angular/router/testing';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import * as helpers from '../../../spec/helpers';
import { BodyStateClassesService } from "./body-state-classes.service";
import { AuthService } from "./../../login/auth.service";
import { AuthEvents } from "./../../login/auth-events";
import { EventEmitter } from '@angular/core';
import { DesignModeService } from './design-mode.service';

describe("BodyStateClasses Service", () => {
    let mocks = helpers.getMocks();
    let service: BodyStateClassesService;
    beforeEach(async(() => {
        mocks.authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(true);
        mocks.authService.loginSuccess = new EventEmitter();
        mocks.authService.logoutSuccess = new EventEmitter();
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                BodyStateClassesService,
                { provide: AuthService, useValue: mocks.authService },
                { provide: DesignModeService, useValue: mocks.designModeService },
                { provide: LocalStorageService, useValue: mocks.localStorageService }
            ]
        });
        service = TestBed.get(BodyStateClassesService);
    }));

    it("should add the class noosfero-user-logged to the body element if the user is authenticated", () => {
        service.start();
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.USER_LOGGED_CLASSNAME)).toBeTruthy();
    });

    it("should add the class noosfero-route-[currentStateName] in body element", fakeAsync(() => {
        service.start();
        TestBed.get(ActivatedRoute).component = { name: "MyComponent"  };
        service['router'].navigate(['/']);
        tick();
        expect(service['getBodyElement']().hasClass("noosfero-route-my-component")).toBeTruthy();
    }));

    it("should capture loginSuccess event and add noosfero-user-logged class to the body element", fakeAsync(() => {
        TestBed.get(AuthService).isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(false);
        service.start();
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.USER_LOGGED_CLASSNAME)).toBeFalsy();
        TestBed.get(AuthService).loginSuccess.next(null);
        tick();
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.USER_LOGGED_CLASSNAME)).toBeTruthy();
    }));

    it("should capture logoutSuccess event and remove noosfero-user-logged class from the body element", () => {
        // triggers the service start
        service.start();
        // because the user is already authenticated
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.USER_LOGGED_CLASSNAME)).toBeTruthy();
        // emit the event logoutSuccess
        TestBed.get(AuthService).logoutSuccess.next(null);
        // and check now if body hasn't user logged class
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.USER_LOGGED_CLASSNAME)).toBeFalsy();
    });

    it("add a css class theme skin to body element", () => {
        let skinClass: string = 'skin-test';
        service.start({
            skin: skinClass
        });
        expect(service['getBodyElement']().hasClass(skinClass)).toBeTruthy();
    });

    it("add a css class to content wrapper element", () => {
        let contentWrapperMock = jasmine.createSpyObj("contentWrapperMock", ["addClass", "removeClass"]);
        service["getContentWrapper"] = jasmine.createSpy("getContentWrapper").and.returnValue(contentWrapperMock);
        service.addContentClass(true);

        expect(contentWrapperMock.addClass).toHaveBeenCalledWith(BodyStateClassesService.CONTENT_WRAPPER_FULL);
    });

    it("remove a css class from content wrapper element", () => {
        let contentWrapperMock = jasmine.createSpyObj("contentWrapperMock", ["addClass", "removeClass"]);
        service["getContentWrapper"] = jasmine.createSpy("getContentWrapper").and.returnValue(contentWrapperMock);
        service.addContentClass(false);

        expect(contentWrapperMock.removeClass).toHaveBeenCalledWith(BodyStateClassesService.CONTENT_WRAPPER_FULL);
    });

    it("should add class noosfero-design-on when designMode is changed to true", () => {
        TestBed.get(DesignModeService).onToggle = new EventEmitter();
        service.start();
        TestBed.get(DesignModeService).onToggle.next(true);
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME)).toBeTruthy();
    });

    it("should remove class noosfero-design-on when designMode is changed to false", () => {
        TestBed.get(DesignModeService).onToggle = new EventEmitter();
        service.start();
        TestBed.get(DesignModeService).onToggle.next(false);
        expect(service['getBodyElement']().hasClass(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME)).toBeFalsy();
    });

    it("save skin into settings at local storage", () => {
        service.setThemeSkin('skin-test2');
        expect(TestBed.get(LocalStorageService).get('skin')).toEqual('skin-test2');
    });

    it("get theme skin from local storage", () => {
        mocks.localStorageService.set('skin', 'skin-test3');
        expect(service.getThemeSkin()).toEqual('skin-test3');
    });
});
