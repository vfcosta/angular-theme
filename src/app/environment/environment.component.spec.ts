import {quickCreateComponent} from "../../spec/helpers";
import {EnvironmentComponent} from "./environment.component";

describe("Components", () => {
    describe("Environment Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let environmentServiceMock: any;
        let notificationMock: any;
        let $state: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $state = jasmine.createSpyObj("$state", ["transitionTo"]);
            environmentServiceMock = jasmine.createSpyObj("environmentServiceMock", ["getByIdentifier", "getBoxes"]);
            notificationMock = jasmine.createSpyObj("notificationMock", ["error"]);

            let environmentResponse = $q.defer();
            environmentResponse.resolve({ id: 1 });
            let getBoxesResponse = $q.defer();
            getBoxesResponse.resolve({ data: { boxes: [{ id: 2 }] } });

            environmentServiceMock.getByIdentifier('default').and.returnValue(environmentResponse.promise);
            environmentServiceMock.getBoxes = jasmine.createSpy("getBoxes").and.returnValue(getBoxesResponse.promise);
        });

        it("get the default environment", done => {
            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock);
            $rootScope.$apply();
            expect(component.environment).toEqual({ id: 1 });
            done();
        });

        it("get the environment boxes", done => {
            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock);
            $rootScope.$apply();
            expect(environmentServiceMock.getBoxes).toHaveBeenCalled();
            expect(component.boxes).toEqual([{ id: 3 }]);
            done();
        });

        it("display notification error when the environment wasn't found", done => {
            let environmentResponse = $q.defer();
            environmentResponse.reject();

            let component: EnvironmentComponent = new EnvironmentComponent(environmentServiceMock, $state, notificationMock);
            $rootScope.$apply();

            expect(notificationMock.error).toHaveBeenCalled();
            expect(component.environment).toBeUndefined();
            done();
        });

    });
});
