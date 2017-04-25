import { SettingsService } from "./settings.service";

describe("Services", () => {
    describe("Settings Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let settingsService: SettingsService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _SettingsService_: SettingsService) => {
            $httpBackend = _$httpBackend_;
            settingsService = _SettingsService_;
        }));

        describe("Succesfull requests", () => {
            it("should return available blocks", (done) => {
                let profileId = 1;
                $httpBackend.expectGET(`/api/v1/profiles/${profileId}/settings/available_blocks`).respond(200, [{type: "RawHTMLBlock"}] );
                settingsService.getAvailableBlocks(<noosfero.Profile>{ id: profileId }).then((content: any) => {
                    expect(content.data[0].type).toEqual("RawHTMLBlock");
                    done();
                });
                $httpBackend.flush();
            });
        });
    });
});
