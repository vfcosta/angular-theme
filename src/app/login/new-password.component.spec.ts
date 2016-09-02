import { ComponentTestHelper, createClass } from "../../spec/component-test-helper";
import * as helpers from "../../spec/helpers";
import { PasswordComponent } from "./new-password.component";


describe("Password Component", () => {
    const htmlTemplate: string = '<new-password></new-password>';

    let helper: ComponentTestHelper<PasswordComponent>;
    let passwordService = helpers.mocks.passwordService;
    let stateService = jasmine.createSpyObj("$state", ["transitionTo"]);
    let stateParams = jasmine.createSpyObj("$stateParams", ["code"]);
    let notificationService = helpers.mocks.notificationService;
    notificationService.success = jasmine.createSpy('success');
    notificationService.error = jasmine.createSpy('error');


    let data: any;

    beforeEach(() => {
        angular.mock.module('templates');
        angular.mock.module('ngSanitize');
        angular.mock.module('ngMessages');
        angular.mock.module('ngPassword');
    });

    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [PasswordComponent],
            providers: [
                helpers.createProviderToValue('$state', stateService),
                helpers.createProviderToValue('$stateParams', stateParams),
                helpers.createProviderToValue('PasswordService', passwordService),
                helpers.createProviderToValue('NotificationService', notificationService),
            ]
        });
        helper = new ComponentTestHelper<PasswordComponent>(cls, done);
    });

    it('new password page was rendered', () => {
        expect(helper.debugElement.query('div.new-password-page').length).toEqual(1);
    });

    it("changes the user password", done => {
        data = {
            code: '1234567890',
            password: 'test',
            passwordConfirmation: 'test'
        };

        helper.component.code = data.code;
        helper.component.password = data.password;
        helper.component.passwordConfirmation = data.passwordConfirmation;

        passwordService.newPassword = jasmine.createSpy("new_password").and.returnValue(Promise.resolve());

        helper.component.sendNewPassword();
        expect(passwordService.newPassword).toHaveBeenCalledWith('1234567890', 'test', 'test');

        expect(notificationService.success).toHaveBeenCalled();

        done();
    });

    it("fails when try to change the user password", done => {
        data = {
            code: '1234567890',
            password: 'test',
            passwordConfirmation: 'test-invalid'
        };

        helper.component.code = data.code;
        helper.component.password = data.password;
        helper.component.passwordConfirmation = data.passwordConfirmation;

        passwordService.newPassword = jasmine.createSpy("new_password").and.returnValue(Promise.reject({ data: { message: 'Error' } }));

        helper.component.sendNewPassword();
        expect(passwordService.newPassword).toHaveBeenCalledWith('1234567890', 'test', 'test-invalid');

        expect(notificationService.error).toHaveBeenCalled();

        done();
    });

});
