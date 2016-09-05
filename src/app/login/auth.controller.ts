import { AuthService } from "./auth.service";
import { NotificationService } from "./../shared/services/notification.service";

export class AuthController {

    static $inject = ["$log", "$stateParams", "AuthService", "$uibModal", "NotificationService"];
    modalInstance: ng.ui.bootstrap.IModalServiceInstance;

    constructor(
        private $log: ng.ILogService,
        private $stateParams: any,
        private AuthService: AuthService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private notificationService: NotificationService
    ) {

    }

    credentials: noosfero.Credentials;
    username: string;

    login() {
        this.AuthService.login(this.credentials);
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
        this.AuthService.forgotPassword(this.username).then((response) => {
            this.notificationService.info({ title: "forgotPasswd.email_sent.title.info", message: "forgotPasswd.email_sent.message.info" });
        }).catch((response) => {
            this.notificationService.error({ title: "forgotPasswd.not_found.title.error", message: "forgotPasswd.not_found.message.error" });
            this.openForgotPassword();
        });
    }
}
