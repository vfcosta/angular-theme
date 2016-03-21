import {quickCreateComponent} from "../../spec/helpers";
import {BasicEditorComponent} from "./basic-editor.component";


describe("Article BasicEditor", () => {

    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let articleServiceMock: any;
    let profileServiceMock: any;
    let $state: any;
    let profile = { id: 1 };
    let notification: any;


    beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    beforeEach(() => {
        $state = jasmine.createSpyObj("$state", ["transitionTo"]);
        notification = jasmine.createSpyObj("notification", ["success"]);
        profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["getCurrentProfile"]);
        articleServiceMock = jasmine.createSpyObj("articleServiceMock", ["createInProfile"]);

        let getCurrentProfileResponse = $q.defer();
        getCurrentProfileResponse.resolve(profile);

        let articleCreate = $q.defer();
        articleCreate.resolve({ data: { path: "path", profile: { identifier: "profile" } } });

        profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(getCurrentProfileResponse.promise);
        articleServiceMock.createInProfile = jasmine.createSpy("createInProfile").and.returnValue(articleCreate.promise);
    });

    it("create an article in the current profile when save", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification);
        component.save();
        $rootScope.$apply();
        expect(profileServiceMock.getCurrentProfile).toHaveBeenCalled();
        expect(articleServiceMock.createInProfile).toHaveBeenCalledWith(profile, component.article);
        done();
    });

    it("got to the new article page and display an alert when saving sucessfully", done => {
        let component: BasicEditorComponent = new BasicEditorComponent(articleServiceMock, profileServiceMock, $state, notification);
        component.save();
        $rootScope.$apply();
        expect($state.transitionTo).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "profile" });
        expect(notification.success).toHaveBeenCalled();
        done();
    });

});
