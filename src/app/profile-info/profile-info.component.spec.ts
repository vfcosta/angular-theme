import {quickCreateComponent} from "../../spec/helpers";
import {ProfileInfo} from "./profile-info.component";

describe("Components", () => {
    describe("Profile Info Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let profileServiceMock: any;
        let $stateParams: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $stateParams = jasmine.createSpyObj("$stateParams", ["profile"]);
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getCurrentProfile", "getActivities"]);

            let getCurrentProfileResponse = $q.defer();
            getCurrentProfileResponse.resolve({ id: 1 });

            let getActivitiesResponse = $q.defer();
            getActivitiesResponse.resolve({ data: { activities: [{ id: 1 }, { id: 2 }] } });

            profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(getCurrentProfileResponse.promise);
            profileServiceMock.getActivities = jasmine.createSpy("getActivities").and.returnValue(getActivitiesResponse.promise);
        });

        it("get the profile activities", done => {
            let component: ProfileInfo = new ProfileInfo(profileServiceMock);
            $rootScope.$apply();
            expect(profileServiceMock.getCurrentProfile).toHaveBeenCalled();
            expect(profileServiceMock.getActivities).toHaveBeenCalled();
            expect(component.activities).toEqual([{ id: 1 }, { id: 2 }]);
            done();
        });
    });
});
