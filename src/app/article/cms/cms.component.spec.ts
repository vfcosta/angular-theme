import { EventsHubService } from './../../shared/services/events-hub.service';
import {quickCreateComponent} from "../../../spec/helpers";
import {CmsComponent} from "./cms.component";
import * as helpers from "../../../spec/helpers";

describe("Article Cms", () => {

    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let articleServiceMock: any;
    let profileServiceMock: any;
    let $state: any;
    let $stateParams: any;
    let $window: any;
    let profile = { id: 1 };
    let notification: any;
    let mocks = helpers.getMocks();

    beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    beforeEach(() => {
        $window = jasmine.createSpyObj("$window", ["back"]);
        $window.location = {pathname: ''};
        $state = jasmine.createSpyObj("$state", ["go"]);
        notification = jasmine.createSpyObj("notification", ["success"]);
        profileServiceMock = jasmine.createSpyObj("profileServiceMock", ["setCurrentProfileByIdentifier", "getCurrentProfile"]);
        articleServiceMock = jasmine.createSpyObj("articleServiceMock", ["createInParent", "updateArticle", "get"]);

        $stateParams = { profile: "profile" };

        let profilePromise = $q.defer();
        profilePromise.resolve(profile);

        let articleCreate = $q.defer();
        articleCreate.resolve({ data: { path: "path", type: "TextArticle", profile: { identifier: "profile" } } });

        let articleGet = $q.defer();
        articleGet.resolve({ data: { path: "parent-path", type: "TextArticle", profile: { identifier: "profile" } } });

        profileServiceMock.setCurrentProfileByIdentifier = jasmine.createSpy("setCurrentProfileByIdentifier").and.returnValue(profilePromise.promise);
        profileServiceMock.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(profilePromise.promise);
        articleServiceMock.createInParent = jasmine.createSpy("createInParent").and.returnValue(articleCreate.promise);
        articleServiceMock.updateArticle = jasmine.createSpy("updateArticle").and.returnValue(articleCreate.promise);
        articleServiceMock.get = jasmine.createSpy("get").and.returnValue(articleGet.promise);
    });

    it("create an article in the current profile when save", done => {
        $stateParams['parent_id'] = 1;
        let component: CmsComponent = new CmsComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams, $window, <any>mocks.eventsHubService);
        component.save();
        $rootScope.$apply();
        expect(profileServiceMock.setCurrentProfileByIdentifier).toHaveBeenCalled();
        expect(articleServiceMock.createInParent).toHaveBeenCalledWith(1, component.article);
        done();
    });

    it("got to the new article page and display an alert when saving sucessfully", done => {
        $stateParams['parent_id'] = 1;
        let component: CmsComponent = new CmsComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams, $window, <any>mocks.eventsHubService);
        component.save();
        $rootScope.$apply();
        expect($state.go).toHaveBeenCalledWith("main.profile.page", { page: "path", profile: "profile" });
        expect(notification.success).toHaveBeenCalled();
        done();
    });

    it("go back when cancel article edition", done => {
        let component: CmsComponent = new CmsComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams, $window, <any>mocks.eventsHubService);
        $window.history = { back: jasmine.createSpy('back') };
        component.cancel();
        expect($window.history.back).toHaveBeenCalled();
        done();
    });

    it("edit existing article when save", done => {
        $stateParams['parent_id'] = null;
        $stateParams['id'] = 2;
        let component: CmsComponent = new CmsComponent(articleServiceMock, profileServiceMock, $state, notification, $stateParams, $window, <any>mocks.eventsHubService);
        $rootScope.$apply();
        component.save();
        $rootScope.$apply();
        expect(articleServiceMock.updateArticle).toHaveBeenCalledWith(component.article);
        done();
    });

});
