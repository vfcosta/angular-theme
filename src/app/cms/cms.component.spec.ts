import {quickCreateComponent} from "../../spec/helpers";
import {Cms} from "./cms.component";

describe("Components", () => {
    describe("Cms Component", () => {

        let $rootScope: ng.IRootScopeService;
        let $q: ng.IQService;
        let articleServiceMock: any;
        let profileServiceMock: any;
        let $state: any;
        let sweetAlert: any;

        beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
        }));

        beforeEach(() => {
            $state = jasmine.createSpyObj("$state", ["transitionTo"]);
            sweetAlert = jasmine.createSpyObj("SweetAlert", ["swal"]);
            profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getCurrentProfile"]);
            articleServiceMock = jasmine.createSpyObj("articleServiceMock", ["create"]);

            let getCurrentProfileResponse = $q.defer();
            getCurrentProfileResponse.resolve({ id: 1 });

            let articleCreate = $q.defer();
            articleCreate.resolve({ path: "path", profile: { identifier: "profile" }  });

            profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(getCurrentProfileResponse.promise);
            articleServiceMock.create = jasmine.createSpy("create").and.returnValue(articleCreate.promise);
        });

        it("create an article in the current profile when save", done => {
            let component: Cms = new Cms(articleServiceMock, profileServiceMock, $state, sweetAlert);
            component.save();
            $rootScope.$apply();
            expect(profileServiceMock.getCurrentProfile).toHaveBeenCalled();
            expect(articleServiceMock.create).toHaveBeenCalledWith(1, component.article);
            done();
        });

        it("got to the new article page and display an alert when saving sucessfully", done => {
            let component: Cms = new Cms(articleServiceMock, profileServiceMock, $state, sweetAlert);
            component.save();
            $rootScope.$apply();
            expect($state.transitionTo).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "profile" });
            expect(sweetAlert.swal).toHaveBeenCalled();
            done();
        });

    });
});
