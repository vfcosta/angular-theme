import { AuthService } from "./auth.service";
import { NotificationService } from "./../shared/services/notification.service";

export class AuthController {

    static $inject = ["$stateParams", "authService", "$uibModal", "notificationService"];
    modalInstance: ng.ui.bootstrap.IModalServiceInstance;

    constructor(
        private $stateParams: any,
        private authService: AuthService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private notificationService: NotificationService
    ) {

    }

    credentials: noosfero.Credentials;
    username: string;

    login() {
        this.authService.login(this.credentials).then((response) => {
            this.notificationService.info({ title: "auth.login.success.title", message: "auth.login.success.message" });
        }).catch((response) => {
            this.notificationService.error({ title: "auth.login.error.title", message: "auth.login.error.message" });
        });
    }

    openForgotPassword() {
        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/login/forgot-password.html',
            controller: AuthController,
            controllerAs: 'vm',
            bindToController: true,
        });
    }

    sendPasswdInfo() {
        this.authService.forgotPassword(this.username).then((response) => {
            this.notificationService.info({ title: "auth.forgot_password.mail.title", message: "forgot_password.mail.message" });
        }).catch((response) => {
            this.notificationService.error({ title: "auth.forgot_password.not_found.title", message: "auth.forgot_password.not_found.message" });
            this.openForgotPassword();
        });
    }
}
