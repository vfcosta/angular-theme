import * as helpers from '../../../spec/helpers';
import {BodyStateClassesService} from "./body-state-classes.service";
import {AuthService} from "./../../login/auth.service";
import {AuthEvents} from "./../../login/auth-events";

import {EventEmitter} from 'ng-forward';
import {DesignModeService} from './../../admin/designMode.service';

describe("BodyStateClasses Service", () => {

    let currentStateName = "main";
    let bodyStateClasseService: BodyStateClassesService;
    let $rootScope: ng.IRootScopeService = <any>{},
        $document: ng.IDocumentService = <any>{},
        $state: ng.ui.IStateService = <any>{
            current: {
                name: currentStateName
            }
        },
        authService: any = helpers.mocks.authService,
        bodyEl: { className: string },
        bodyElJq: any,
        designModeService = new DesignModeService();



    let getService = (): BodyStateClassesService => {
        return new BodyStateClassesService($rootScope, $document, $state, authService, designModeService);
    };

    beforeEach(() => {
        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(true);
        bodyEl = { className: "" };
        bodyElJq = [bodyEl];
    });

    it("should add the class noosfero-user-logged to the body element if the user is authenticated", () => {
        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(true);
        $rootScope.$on = jasmine.createSpy("$on");

        let service = getService();

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");
        service["bodyElement"] = bodyElJq;

        service.start();
        expect(bodyElJq.addClass).toHaveBeenCalledWith(BodyStateClassesService.USER_LOGGED_CLASSNAME);
    });

    it("should add the class noosfero-route-[currentStateName] the body element", () => {
        $rootScope.$on = jasmine.createSpy("$on");
        let service = getService();

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");
        service["bodyElement"] = bodyElJq;

        service.start();
        let stateClassName = BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + currentStateName;
        expect(bodyElJq.addClass).toHaveBeenCalledWith(stateClassName);
    });

    it("should capture loginSuccess event and add noosfero-user-logged class to the body element", () => {
        let userLoggedClassName = BodyStateClassesService.USER_LOGGED_CLASSNAME;

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");
        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(false);
        let service = getService();

        service["bodyElement"] = bodyElJq;

        // triggers the service start
        service.start();
        // check if the the body element addClass was not called yet,
        // because the user is not authenticated
        expect(bodyElJq.addClass).not.toHaveBeenCalledWith(userLoggedClassName);

        // emit the event loginSuccess
        authService.loginSuccess.next(null);

        // and check now if the addClass was called passing the userLogged class
        // to the body Element
        expect(bodyElJq.addClass).toHaveBeenCalledWith(userLoggedClassName);
    });

    it("should capture logoutSuccess event and remove noosfero-user-logged class from the body element", () => {
        let userLoggedClassName = BodyStateClassesService.USER_LOGGED_CLASSNAME;

        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(true);

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");

        let service = getService();
        service["bodyElement"] = bodyElJq;

        // triggers the service start
        service.start();

        // check if the the body element addClass was called
        // because the user is already authenticated
        expect(bodyElJq.addClass).toHaveBeenCalledWith(userLoggedClassName);

        // emit the event logoutSuccess
        authService.logoutSuccess.next(null);

        // and check now if the removeClass was called passing the userLogged class
        // to the body Element
        expect(bodyElJq.removeClass).toHaveBeenCalledWith(userLoggedClassName);
    });

    it("should capture $stateChangeSuccess event and switch route class in the body element", () => {
        let userLoggedClassName = BodyStateClassesService.USER_LOGGED_CLASSNAME;

        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(false);
        $rootScope = <any>helpers.mocks.scopeWithEvents();
        bodyElJq.addClass = (className: string) => {
            bodyEl.className = className;
        };
        bodyElJq.removeClass = jasmine.createSpy("removeClass");

        let service = getService();
        service["bodyElement"] = bodyElJq;

        // triggers the service start
        service.start();

        // checks if the bodyEl has a class indicating the currentState
        expect(bodyEl.className).toEqual(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + currentStateName);

        // emit the event $stateChangeSuccess
        $rootScope.$emit("$stateChangeSuccess", null, { name: "new-route" });

        // and check now if the bodyEl has a class indicating the new state route
        expect(bodyEl.className).toEqual(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + "new-route");
    });

    it("add a css class theme skin to body element", () => {
        let service = getService();
        let skinClass: string = 'skin-test';

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");
        service["bodyElement"] = bodyElJq;

        service.start({
            skin: skinClass
        });

        expect(bodyElJq.addClass).toHaveBeenCalledWith(skinClass);
    });

    it("add a css class to content wrapper element", () => {
        let service = getService();

        let contentWrapperMock = jasmine.createSpyObj("contentWrapperMock", ["addClass", "removeClass"]);
        service["getContentWrapper"] = jasmine.createSpy("getContentWrapper").and.returnValue(contentWrapperMock);
        service.addContentClass(true);

        expect(contentWrapperMock.addClass).toHaveBeenCalledWith(BodyStateClassesService.CONTENT_WRAPPER_FULL);
    });

    it("remove a css class from content wrapper element", () => {
        let service = getService();

        let contentWrapperMock = jasmine.createSpyObj("contentWrapperMock", ["addClass", "removeClass"]);
        service["getContentWrapper"] = jasmine.createSpy("getContentWrapper").and.returnValue(contentWrapperMock);
        service.addContentClass(false);

        expect(contentWrapperMock.removeClass).toHaveBeenCalledWith(BodyStateClassesService.CONTENT_WRAPPER_FULL);
    });

    it("should add the class noosfero-design-on when designMode is changed to true", () => {
        let fnOnToggle: Function = null;
        designModeService.onToggle = <any> {
            subscribe: (fn: Function) => {
                fnOnToggle = fn;
            },
            next: (value: boolean) => {
                fnOnToggle.apply(designModeService, [value]);
            }
        };

        let service = getService();

        bodyElJq.addClass = jasmine.createSpy("addClass");
        bodyElJq.removeClass = jasmine.createSpy("removeClass");
        service["bodyElement"] = bodyElJq;

        service.start();

        debugger;
        designModeService.setInDesignMode(true);


        expect(bodyElJq.addClass).toHaveBeenCalledWith(BodyStateClassesService.DESIGN_MODE_ON_CLASSNAME);
    });
});
