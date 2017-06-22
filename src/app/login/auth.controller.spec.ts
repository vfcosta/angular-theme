import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NotificationService } from "./../shared/services/notification.service";
import * as helpers from "./../../spec/helpers";

describe("Controllers", () => {

    describe("AuthController", () => {

        let $modal: any;
        let notificationService: NotificationService;
        let authController: any;
        let AuthServiceMock: AuthService;
        let username: string;

        beforeEach(() => {
            $modal = helpers.mocks.$modal;
            AuthServiceMock = <any>{
                login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
                forgotPassword: jasmine.createSpy('forgotPassword').and.returnValue(Promise.resolve())
            };
            notificationService = jasmine.createSpyObj("NotificationService", ["info", "error"]);
            authController = new AuthController(null, AuthServiceMock, $modal, notificationService);
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

        it("calls info on NotificationService when sendPasswdInfo was sucessfully", done => {
            AuthServiceMock.forgotPassword = () => helpers.mocks.promiseResultTemplate();
            authController.username = "john";
            notificationService.info = jasmine.createSpy('info');
            authController.sendPasswdInfo();
            expect(notificationService.info).toHaveBeenCalled();
            done();
        });

        it("calls error on NotificationService when sendPasswdInfo was not sucessfully", done => {
            authController.openForgotPassword = jasmine.createSpy('openForgotPassword');
            authController.username = "john";
            AuthServiceMock.forgotPassword = () => helpers.mocks.promiseResultTemplate();
            authController.sendPasswdInfo();
            expect(notificationService.error).toHaveBeenCalled();
            done();
        });

        it("calls info on NotificationService when login was sucessfully", done => {
            AuthServiceMock.login = () => helpers.mocks.promiseResultTemplate();
            notificationService.info = jasmine.createSpy('info');
            authController.login();
            expect(notificationService.info).toHaveBeenCalled();
            done();
        });

        it("calls error on NotificationService when login was not sucessfully", done => {
            AuthServiceMock.login = () => helpers.mocks.promiseResultTemplate();
            authController.login();
            expect(notificationService.error).toHaveBeenCalled();
            done();
        });

    });
});
