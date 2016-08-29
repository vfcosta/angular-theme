import { ComponentTestHelper, createClass } from "../../spec/component-test-helper";
import * as helpers from "../../spec/helpers";
import { RegisterComponent } from "./register.component";

describe("Register Component", () => {
    const htmlTemplate: string = '<noosfero-register></noosfero-register>';

    let helper: ComponentTestHelper<RegisterComponent>;
    let registerService = helpers.mocks.registerService;
    let stateService: angular.ui.IStateService;
    let notificationService = helpers.mocks.notificationService;
    notificationService.success = jasmine.createSpy('success');
    notificationService.error = jasmine.createSpy('error');
    let user_data: any;
    let response: any;
    let deferred: any;
    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;

    beforeEach(() => {
        stateService = jasmine.createSpyObj("$state", ["transitionTo"]);

        angular.mock.module('templates');
        angular.mock.module('ngSanitize');
        angular.mock.module('ngMessages');
        angular.mock.module('ngPassword');
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [RegisterComponent],
            providers: [
                helpers.createProviderToValue('$state', stateService),
                helpers.createProviderToValue('$uibModal', helpers.mocks.$modal),
                helpers.createProviderToValue('RegisterService', registerService),
                helpers.createProviderToValue('NotificationService', notificationService),
                helpers.createProviderToValue('EnvironmentService', helpers.mocks.environmentService)
            ]
        });
        helper = new ComponentTestHelper<RegisterComponent>(cls, done);
    });

    beforeEach(inject((_$rootScope_: ng.IRootScopeService, _$q_: ng.IQService) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    it('register page was rendered', () => {
        expect(helper.debugElement.query('div.register-page').length).toEqual(1);
    });

    it("registers a new user", done => {
        user_data = { username: "username", password: "password", password_confirmation: "password", email: "user@company.com" };
        response = {};

        helper.component.account = user_data;

        deferred = $q.defer();
        deferred.resolve({ data: response });
        registerService.createAccount = jasmine.createSpy("createAccount").and.returnValue(deferred.promise);

        helper.component.signup();
        helper.detectChanges();

        expect(registerService.createAccount).toHaveBeenCalledWith(user_data);
        expect(stateService.transitionTo).toHaveBeenCalledWith("main.environment.home");
        expect(notificationService.success).toHaveBeenCalled();

        done();
    });

    it("gives error when registration fails", done => {
        user_data = { password: "pas" };
        response = { data: { message: '{ "password": ["is too short"] }' } };

        helper.component.account = user_data;

        deferred = $q.defer();
        deferred.reject(response);
        registerService.createAccount = jasmine.createSpy("createAccount").and.returnValue(deferred.promise);

        helper.component.signup();
        helper.detectChanges();

        expect(registerService.createAccount).toHaveBeenCalledWith(user_data);

        expect(stateService.transitionTo).not.toHaveBeenCalledWith("main.environment.home");
        expect(notificationService.error).toHaveBeenCalled();

        done();
    });
});
