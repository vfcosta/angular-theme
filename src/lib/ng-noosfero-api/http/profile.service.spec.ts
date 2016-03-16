import {ProfileService} from "./profile.service";

describe("Services", () => {

    describe("Profile Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let profileService: ProfileService;
        let $rootScope: ng.IRootScopeService;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _ProfileService_: ProfileService, _$rootScope_: ng.IRootScopeService) => {
            $httpBackend = _$httpBackend_;
            profileService = _ProfileService_;
            $rootScope = _$rootScope_;
        }));

        describe("Succesfull requests", () => {

            it("should return profile by its identifier", (done) => {
                let identifier = 'profile1';
                $httpBackend.expectGET(`/api/v1/profiles?identifier=${identifier}`).respond(200, [{ name: "profile1" }]);
                profileService.getByIdentifier(identifier).then((profile: noosfero.Profile) => {
                    expect(profile).toEqual({ name: "profile1" });
                    done();
                });
                $httpBackend.flush();
            });

            it("should reject the promise if the profile wasn't found", (done) => {
                let identifier = 'profile1';
                $httpBackend.expectGET(`/api/v1/profiles?identifier=${identifier}`).respond(200, []);
                profileService.getByIdentifier(identifier).catch(() => {
                    done();
                });
                $httpBackend.flush();
            });

            it("should return the members of a profile", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/members`).respond(200, [{ name: "profile1" }]);
                profileService.getProfileMembers(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ name: "profile1" });
                    done();
                });
                $httpBackend.flush();
            });

            it("should return the boxes of a profile", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/boxes`).respond(200, [{ position: 1 }]);
                profileService.getBoxes(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ position: 1 });
                    done();
                });
                $httpBackend.flush();
            });

            it("should return activities of a profile", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/activities`).respond(200, [{ verb: "create_article" }]);
                profileService.getActivities(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ verb: "create_article" });
                    done();
                });
                $httpBackend.flush();
            });

            it("should resolve the current profile", (done) => {
                let profile = { id: 1, identifier: "profile1" };
                profileService.getCurrentProfile().then((currentProfile: noosfero.Profile) => {
                    expect(currentProfile).toEqual(currentProfile);
                    done();
                });
                profileService.setCurrentProfile(<any>profile);
                $rootScope.$apply();
            });

            it("should return the profile home page", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/home_page`).respond(200, { article: { path: "/something" } });
                profileService.getHomePage(profileId).then((response: restangular.IResponse) => {
                    expect(response.data.article).toEqual({ path: "/something" });
                    done();
                });
                $httpBackend.flush();
            });

            it("should find the profile by identifier, set and resolve the current profile", (done) => {
                let identifier = 'profile1';
                $httpBackend.expectGET(`/api/v1/profiles?identifier=${identifier}`).respond(200, [{ name: "profile1" }]);
                profileService.setCurrentProfileByIdentifier(identifier).then((profile: noosfero.Profile) => {
                    expect(profile).toEqual({ name: "profile1" });
                    profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
                        expect(profile).toEqual({ name: "profile1" });
                        done();
                    });
                });
                $httpBackend.flush();
            });
        });


    });
});
