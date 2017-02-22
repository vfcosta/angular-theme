import { quickCreateComponent } from "../../spec/helpers";
import { ProfileComponent } from "./profile.component";

describe("Components", () => {
    describe("Profile Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let profileServiceMock: any;
        let notificationMock: any;
        let $stateParams: any;
        let $state: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $state = jasmine.createSpyObj("$state", ["transitionTo"]);
            $state.params = { currentProfile: {} };
            $stateParams = jasmine.createSpyObj("$stateParams", ["profile"]);
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["setCurrentProfile", "setCurrentProfileByIdentifier", "getBoxes"]);
            notificationMock = jasmine.createSpyObj("notificationMock", ["error"]);

            let profileResponse = $q.defer();
            profileResponse.resolve({ id: 1 });
            let getBoxesResponse = $q.defer();
            getBoxesResponse.resolve({ data: [{ id: 2 }] });

            profileServiceMock.setCurrentProfileByIdentifier = jasmine.createSpy("setCurrentProfileByIdentifier").and.returnValue(profileResponse.promise);
            profileServiceMock.getBoxes = jasmine.createSpy("getBoxes").and.returnValue(getBoxesResponse.promise);
        });

        it("get the profile from state params when it's setted", done => {
            $state.params = { currentProfile: { id: 2 } };
            let component: ProfileComponent = new ProfileComponent(profileServiceMock, $stateParams, $state, notificationMock);
            $rootScope.$apply();
            expect(profileServiceMock.setCurrentProfileByIdentifier).not.toHaveBeenCalled();
            expect(component.profile).toEqual({ id: 2 });
            done();
        });

        it("get the profile and store in profile service", done => {
            let component: ProfileComponent = new ProfileComponent(profileServiceMock, $stateParams, $state, notificationMock);
            $rootScope.$apply();
            expect(profileServiceMock.setCurrentProfileByIdentifier).toHaveBeenCalled();
            expect(component.profile).toEqual({ id: 1 });
            done();
        });

        it("get the profile boxes", done => {
            let component: ProfileComponent = new ProfileComponent(profileServiceMock, $stateParams, $state, notificationMock);
            $rootScope.$apply();
            expect(profileServiceMock.getBoxes).toHaveBeenCalled();
            expect(component.boxes).toEqual([{ id: 2 }]);
            done();
        });

        it("display notification error when the profile wasn't found", done => {
            let profileResponse = $q.defer();
            profileResponse.reject();
            profileServiceMock.setCurrentProfileByIdentifier = jasmine.createSpy("setCurrentProfileByIdentifier").and.returnValue(profileResponse.promise);

            let component: ProfileComponent = new ProfileComponent(profileServiceMock, $stateParams, $state, notificationMock);
            $rootScope.$apply();

            expect(profileServiceMock.setCurrentProfileByIdentifier).toHaveBeenCalled();
            expect(notificationMock.error).toHaveBeenCalled();
            expect(component.profile).toBeUndefined();
            done();
        });

    });
});
