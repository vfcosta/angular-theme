import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import * as helpers from "./../../spec/helpers";

describe("Controllers", () => {


    describe("AuthController", () => {

        let $modal: any;
        let notificationService = helpers.mocks.notificationService;
        notificationService.success = jasmine.createSpy('info');
        notificationService.error = jasmine.createSpy('error');

        let authController: any;
        let AuthServiceMock: AuthService;
        let username: string;

        beforeEach(() => {
            $modal = helpers.mocks.$modal;
            AuthServiceMock = jasmine.createSpyObj("AuthService", ["login", "forgotPassword"]);
            authController = new AuthController(null, null, AuthServiceMock, $modal, notificationService);
        });


        it("calls authenticate on AuthService when login called", () => {
            let credentials = { username: "username", password: "password" };
            authController.credentials = credentials;
            authController.login();
            expect(AuthServiceMock.login).toHaveBeenCalledWith(credentials);
        });

        it('should open forgot password on click', (done: Function) => {
            spyOn($modal, "open");
            authController.openForgotPassword();
            expect($modal.open).toHaveBeenCalled();
            expect($modal.open).toHaveBeenCalledWith({
                templateUrl: 'app/login/forgot-password.html',
                controller: AuthController,
                controllerAs: 'vm',
                bindToController: true
            });
            done();
        });

        it("calls forgotPassword on AuthService when sendPasswdInfo called", done => {
            authController.username = "john";
            AuthServiceMock.forgotPassword = jasmine.createSpy("forgotPassword").and.returnValue(Promise.resolve());
            authController.sendPasswdInfo();
            expect(AuthServiceMock.forgotPassword).toHaveBeenCalledWith("john");
            done();
        });

    });
});
