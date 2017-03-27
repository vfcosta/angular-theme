import { provide, Component, componentStore, bundleStore } from "ng-forward";
import {MainComponent} from "./main.component";
import {TestComponentBuilder, ComponentFixture} from "ng-forward/cjs/testing/test-component-builder";

import {quickCreateComponent} from "../../spec/helpers";
import {getAngularServiceFactory} from "../../spec/helpers";
import { EVENTS_HUB_KNOW_EVENT_NAMES } from "../shared/services/events-hub.service";

describe("MainComponent", function() {

    let localFixture: ComponentFixture;
    let $state: angular.ui.IStateService;
    let $q: ng.IQService;
    let $httpBackend: ng.IHttpBackendService;
    let authService: any = jasmine.createSpyObj("authService", ["loginFromCookie", "isAuthenticated", "subscribe"]);
    let environmentService: any = jasmine.createSpyObj("environmentService", ["get", "getCurrentEnvironment"]);

    beforeEach(angular.mock.module("ui.router"));
    beforeEach(angular.mock.module("templates"));
    beforeEach(angular.mock.module("pascalprecht.translate", ($translateProvider: angular.translate.ITranslateProvider) => {
        $translateProvider.translations('en', {});
    }));

    @Component({
        selector: "parent",
        template: "<main></main>",
        directives: [MainComponent],
        providers: [
            provide("AuthService",
                {
                    useValue: authService
                }),

            provide("EnvironmentService",
                {
                    useValue: environmentService
                }),
            provide(EVENTS_HUB_KNOW_EVENT_NAMES,
                {
                    useValue: [
                        'IMAGE_PROFILE_UPDATED',
                        'PROFILE_INFO_UPDATED',
                        'ARTICLE_UPDATED',
                        'TASK_CLOSED'
                    ]
                }),
        ]
    })
    class MainComponentParent {
        constructor() {

        }
    }

    beforeEach(() => {
        authService.loginFromCookie = jasmine.createSpy("loginFromCookie").and.returnValue({ id: 1, name: "user1" });
        environmentService.get = jasmine.createSpy("get").and.returnValue({ id: 1, name: "Noosfero Default Environment" });
    });
    // FIXME make this test works
    // it("renders the main component only when the login and environment were resolved", (done) => {
    //     quickCreateComponent({ directives: [MainComponentParent], template: "<parent></parent>" })
    //         .then((fixture) => {
    //             fixture.debugElement.getLocal("$httpBackend").expectGET("/api/v1/environments/1/boxes").respond(200, {});
    //             fixture.debugElement.getLocal("$httpBackend").expectGET("/api/v1/tasks?all_pending=true&per_page=5&status=1").respond(200, {});
    //             localFixture = fixture;
    //             // get the $state service to navigate between routes
    //             $state = fixture.debugElement.getLocal("$state");
    //             // navigates to the environment home
    //             $state.go("main.environment.home");
    //             localFixture.detectChanges();
    //             // after changes were detected it checks the current $state route
    //             expect($state.current.name).toEqual("main.environment.home");
    //             done();
    //         });
    //
    // });
});
