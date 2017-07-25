import { AuthService } from './auth.service';
import { NotificationService } from './../shared/services/notification.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "noosfero-forgot-password",
    templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
    @Input("show") show = false;
    @Output("showChange") showChange = new EventEmitter();
    username: string;

    constructor(private authService: AuthService, private notificationService: NotificationService) { }

    hide() {
        this.show = false;
        this.showChange.emit(this.show);
    }

    sendPasswdInfo() {
        this.authService.forgotPassword(this.username).then((response) => {
            this.notificationService.info({ title: "auth.forgot_password.mail.title", message: "forgot_password.mail.message" });
            this.hide();
        }).catch((response) => {
            this.notificationService.error({ title: "auth.forgot_password.not_found.title", message: "auth.forgot_password.not_found.message" });
        });
    }
}
