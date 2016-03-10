import {AuthController} from "./auth_controller";
import {AuthService} from "./auth_service";

describe("Controllers", () => {


    describe("AuthController", () => {

        it("calls authenticate on AuthService when login called", () => {

            // creating a Mock AuthService
            let AuthServiceMock: AuthService = jasmine.createSpyObj("AuthService", ["login"]);

            // pass AuthServiceMock into the constructor
            let authController = new AuthController(null, null, AuthServiceMock);

            // setup of authController -> set the credentials instance property
            let credentials = { username: "username", password: "password" };

            authController.credentials = credentials;

            // calls the authController login method
            authController.login();

            // checks if the method login of the injected AuthService has been called
            expect(AuthServiceMock.login).toHaveBeenCalledWith(credentials);

        });



    });
});
