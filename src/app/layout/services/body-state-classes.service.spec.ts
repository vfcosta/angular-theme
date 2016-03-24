import {provideFilters} from '../../../spec/helpers';
import {BodyStateClassesService} from "./body-state-classes.service";
import {AuthService} from "./../../login/auth.service";

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
        authService: AuthService = <any>{
            isAuthenticated: () => false
        },
        bodyEl: { className: string } = { className: "" },
        bodyElJq: any = [bodyEl];

    let getService = (): BodyStateClassesService => {
        return new BodyStateClassesService($rootScope, $document, $state, authService);
    };

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
        pending("Test not yet implemented!");
    });

    it("should capture logoutSuccess event and remove noosfero-user-logged class to the body element", () => {
        pending("Test not yet implemented!");
    });

    it("should capture $stateChangeSuccess event and switch route class in the body element", () => {
        pending("Test not yet implemented!");
    });
});