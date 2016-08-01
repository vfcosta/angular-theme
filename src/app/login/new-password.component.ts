import { StateConfig, Component, Inject, provide } from 'ng-forward';

import { PasswordService } from "../../lib/ng-noosfero-api/http/password.service";
import { NotificationService } from "./../shared/services/notification.service";
import { AuthController } from "./auth.controller";

@Component({
    selector: 'new-password',
    templateUrl: 'app/login/new-password.html',
    providers: [provide('passwordService', { useClass: PasswordService })]
})
@Inject(PasswordService, "$state", "$stateParams", NotificationService)
export class PasswordComponent {

    code: string;
    password: string;
    passwordConfirmation: string;

    constructor(
        public passwordService: PasswordService,
        private $state: ng.ui.IStateService,
        private $stateParams: ng.ui.IStateParamsService,
        private notificationService: NotificationService) {

        this.code = this.$stateParams['code'];
    }

    sendNewPassword() {
        this.passwordService.new_password(this.code, this.password, this.passwordConfirmation).then((response) => {
            this.notificationService.success({ title: "newPasswd.success.title", message: "newPasswd.success.message", timer: 5000 });
            this.$state.transitionTo('main.environment');
        }).catch((response) => {
            this.notificationService.error({ title: "newPasswd.failed.title", message: "newPasswd.failed.message" });
        });
    }
}
