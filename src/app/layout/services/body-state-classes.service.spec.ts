import * as helpers from '../../../spec/helpers';
import {BodyStateClassesService} from "./body-state-classes.service";
import {AuthService} from "./../../login/auth.service";
import {AUTH_EVENTS} from "./../../login/auth-events";

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
        authService: AuthService,
        bodyEl: { className: string },
        bodyElJq: any;


    let getService = (): BodyStateClassesService => {
        return new BodyStateClassesService($rootScope, $document, $state, authService);
    };

    beforeEach(() => {
        authService = <any>{};
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
        $rootScope = <any>helpers.mocks.scopeWithEvents();
        bodyElJq.addClass = jasmine.createSpy("addClass");
        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(false);
        let service = getService();

        service["bodyElement"] = bodyElJq;

        // triggers the service start
        service.start();
        // check if the the body element addClass was not called yet,
        // because the user is not authenticated  
        expect(bodyElJq.addClass).not.toHaveBeenCalledWith(userLoggedClassName);

        // emit the event loginSuccess
        $rootScope.$emit(AUTH_EVENTS.loginSuccess);

        // and check now if the addClass was called passing the userLogged class
        // to the body Element
        expect(bodyElJq.addClass).toHaveBeenCalledWith(userLoggedClassName);
    });

    it("should capture logoutSuccess event and remove noosfero-user-logged class from the body element", () => {
        let userLoggedClassName = BodyStateClassesService.USER_LOGGED_CLASSNAME;

        authService.isAuthenticated = jasmine.createSpy("isAuthenticated").and.returnValue(true);
        $rootScope = <any>helpers.mocks.scopeWithEvents();

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
        $rootScope.$emit(AUTH_EVENTS.logoutSuccess);

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
        $rootScope.$emit("$stateChangeSuccess", null, {name: "new-route"});

        // and check now if the bodyEl has a class indicating the new state route
        expect(bodyEl.className).toEqual(BodyStateClassesService.ROUTE_STATE_CLASSNAME_PREFIX + "new-route");
    });
});