import {quickCreateComponent} from "../../spec/helpers";
import {ProfileHome} from "./profile-home.component";

describe("Components", () => {
    describe("Profile Home Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let homePageResponse: ng.IDeferred<any>;
        let profileServiceMock: any;
        let $state: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $state = jasmine.createSpyObj("$state", ["transitionTo"]);
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getCurrentProfile", "getHomePage"]);

            let currentProfileResponse = $q.defer();
            currentProfileResponse.resolve({ identifier: "profile" });
            homePageResponse = $q.defer();

            profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(currentProfileResponse.promise);
            profileServiceMock.getHomePage = jasmine.createSpy("getHomePage").and.returnValue(homePageResponse.promise);
        });

        it("transition to profile homepage when there is a homepage setted", done => {
            homePageResponse.resolve({ data: { article: { path: "something" } } });

            let component: ProfileHome = new ProfileHome(profileServiceMock, $state);
            $rootScope.$apply();
            expect(profileServiceMock.getCurrentProfile).toHaveBeenCalled();
            expect(profileServiceMock.getHomePage).toHaveBeenCalled();

            expect($state.transitionTo).
                toHaveBeenCalledWith("main.profile.page",
                { page: "something", profile: "profile" }, { location: false });
            done();
        });

        it("transition to profile info page when there is no homepage setted", done => {
            homePageResponse.resolve({ data: {} });

            let component: ProfileHome = new ProfileHome(profileServiceMock, $state);
            $rootScope.$apply();
            expect(profileServiceMock.getCurrentProfile).toHaveBeenCalled();
            expect(profileServiceMock.getHomePage).toHaveBeenCalled();

            expect($state.transitionTo).
                toHaveBeenCalledWith("main.profile.info",
                { profile: "profile" }, { location: false });
            done();
        });
    });
});
