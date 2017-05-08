import { DesignModeService } from './../shared/services/design-mode.service';
import { quickCreateComponent } from "../../spec/helpers";
import { EnvironmentComponent } from "./environment.component";
import * as helpers from "../../spec/helpers";

describe("Components", () => {
    fdescribe("Environment Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let environmentServiceMock: any;
        let authServiceMock: any;
        let notificationMock: any;
        let $state: any;
        let defaultEnvironment = <any>{ id: 1, name: 'Noosfero' };
        let mocks = helpers.getMocks();
        let designModeServiceMock = <DesignModeService>mocks.designModeService;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $state = jasmine.createSpyObj("$state", ["transitionTo"]);
            $state.params = { environment: defaultEnvironment };
            environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["setCurrentEnvironment", "getBoxes", "getCurrentEnvironment"]);
            notificationMock = jasmine.createSpyObj("notificationMock", ["error"]);

            authServiceMock = jasmine.createSpyObj("authServiceMock", ["subscribe"]);

            let getBoxesResponse = $q.defer();
            getBoxesResponse.resolve({ data: [{ id: 2 }] });

            environmentServiceMock.getBoxes = jasmine.createSpy("getBoxes").and.returnValue(getBoxesResponse.promise);
            environmentServiceMock.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(helpers.mocks.promiseResultTemplate(defaultEnvironment));
        });

        it("get the default environment", done => {
            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock, authServiceMock, designModeServiceMock);
            $rootScope.$apply();
            expect(component.environment).toEqual({ id: 1, name: 'Noosfero', boxes: [ Object({ id: 2 }) ] });
            done();
        });

        it("get the environment boxes", done => {
            $state.params = { environment: {} };
            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock, authServiceMock, designModeServiceMock);
            $rootScope.$apply();
            expect(environmentServiceMock.getBoxes).toHaveBeenCalled();
            expect(component.boxes).toEqual([{ id: 2 }]);
            done();
        });

        it("display notification error when does not find boxes to the environment", done => {
            let environmentResponse = $q.defer();
            environmentResponse.reject();
            $state.params = { environment: {} };
            environmentServiceMock.getBoxes = jasmine.createSpy('getBoxes').and.returnValue(environmentResponse.promise);

            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock, authServiceMock, designModeServiceMock);
            $rootScope.$apply();

            expect(notificationMock.error).toHaveBeenCalled();
            done();
        });

        it("reset design mode", done => {
            spyOn(designModeServiceMock, "setInDesignMode");
            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock, authServiceMock, designModeServiceMock);
            expect(designModeServiceMock.setInDesignMode).toHaveBeenCalledWith(false);
            done();
        });
    });
});
