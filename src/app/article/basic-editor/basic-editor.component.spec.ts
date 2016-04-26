import {quickCreateComponent} from "../../../spec/helpers";
import {BasicEditorComponent} from "./basic-editor.component";


describe("Article BasicEditor", () => {

    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let articleServiceMock: any;
    let profileServiceMock: any;
    let $state: any;
    let $stateParams: any;
    let profile = { id: 1 };
    let notification: any;


    beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    beforeEach(() => {
        $state = jasmine.createSpyObj("$state", ["go"]);
        $stateParams = jasmine.createSpyObj("$stateParams", ["parent_id", "profile"]);
        notification = jasmine.createSpyObj("notification", ["success"]);
        profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["setCurrentProfileByIdentifier"]);
        articleServiceMock = jasmine.createSpyObj("articleServiceMock", ["createInParent", "get"]);

        $stateParams.profile = jasmine.createSpy("profile").and.returnValue("profile");

        let setCurrentProfileByIdentifierResponse = $q.defer();
        setCurrentProfileByIdentifierResponse.resolve(profile);

        let articleCreate = $q.defer();
        articleCreate.resolve({ data: { path: "path", profile: { identifier: "profile" } } });

        let articleGet = $q.defer();
        articleGet.resolve({ data: { path: "parent-path", profile: { identifier: "profile" } } });

        profileServiceMock.setCurrentProfileByIdentifier = jasmine.createSpy("setCurrentProfileByIdentifier").and.returnValue(setCurrentProfileByIdentifierResponse.promise);
        articleServiceMock.createInParent = jasmine.createSpy("createInParent").and.returnValue(articleCreate.promise);
        articleServiceMock.get = jasmine.createSpy("get").and.returnValue(articleGet.promise);
    });

    it("create an article in the current profile when save", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams);
        component.save();
        $rootScope.$apply();
        expect(profileServiceMock.setCurrentProfileByIdentifier).toHaveBeenCalled();
        expect(articleServiceMock.createInParent).toHaveBeenCalledWith($stateParams.parent_id, component.article);
        done();
    });

    it("got to the new article page and display an alert when saving sucessfully", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams);
        component.save();
        $rootScope.$apply();
        expect($state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "profile" });
        expect(notification.success).toHaveBeenCalled();
        done();
    });

    it("got to the parent article page when cancelled", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams);
        $rootScope.$apply();
        component.cancel();
        expect($state.go).toHaveBeenCalledWith("main.profile.page", { page: "parent-path", profile: $stateParams.profile });
        done();
    });

    it("got to the profile home when cancelled and parent was not defined", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams);
        component.cancel();
        expect($state.go).toHaveBeenCalledWith("main.profile.home", { profile: $stateParams.profile });
        done();
    });
});
