import { ComponentTestHelper, createClass } from "../../spec/component-test-helper";
import * as helpers from "../../spec/helpers";
import { RegisterComponent } from "./register.component";
// import {RegisterService} from "../../lib/ng-noosfero-api/http/register.service"


describe("Register Component", () => {
    const htmlTemplate: string = '<noosfero-register></noosfero-register>';

    let helper: ComponentTestHelper<RegisterComponent>;
    let registerService = helpers.mocks.registerService;
    let stateService = jasmine.createSpyObj("$state", ["transitionTo"]);
    let notificationService = helpers.mocks.notificationService;
    notificationService.success = jasmine.createSpy('success');
    notificationService.error = jasmine.createSpy('error');


    let account: any = {
        id: 1,
        login: 'test',
        email: 'test@email.com',
        password: 'xxx',
        passwordConfirmation: 'xxx'
    };

    beforeEach(() => {
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

    it('register page was rendered', () => {
        expect(helper.debugElement.query('div.register-page').length).toEqual(1);
    });

});
